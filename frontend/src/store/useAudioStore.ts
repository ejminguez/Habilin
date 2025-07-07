import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Song } from "@/types";

interface AudioState {
  // Playback state
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  audioInitialized: boolean;
  autoPlay: boolean;

  // Queue management
  songs: Song[];
  currentSongIndex: number;
  currentSong: Song | null;

  // Actions
  setSongs: (songs: Song[]) => void;
  forceSetSongs: (songs: Song[]) => void; // Force reload songs
  setIsPlaying: (playing: boolean) => void;
  setAudioInitialized: (initialized: boolean) => void;
  nextSong: () => void;
  previousSong: () => void;
  selectSong: (index: number, autoPlay?: boolean) => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setAutoPlay: (autoPlay: boolean) => void;
  clearQueue: () => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      // Initial state
      isPlaying: false,
      isMuted: false,
      volume: 1,
      audioInitialized: false,
      autoPlay: true, // Enable autoplay by default
      songs: [],
      currentSongIndex: 0,
      currentSong: null,

      // Set songs and initialize first song
      setSongs: (songs) => {
        const currentState = get();

        // If we already have songs and a current song, preserve the current state
        if (currentState.songs.length > 0 && currentState.currentSong) {
          console.log("Songs already loaded, preserving current state");
          return;
        }

        // Otherwise, set new songs
        set({
          songs,
          currentSong: songs.length > 0 ? songs[0] : null,
          currentSongIndex: 0,
        });
      },

      // Force set songs (for initial load)
      forceSetSongs: (songs) => {
        console.log("Force setting songs:", songs.length);
        const currentState = get();

        // If we have a current song, try to find it in the new song list
        let newCurrentSong = null;
        let newCurrentIndex = 0;

        if (currentState.currentSong) {
          const foundIndex = songs.findIndex(
            (song) =>
              song.song_id === currentState.currentSong?.song_id ||
              song.song_url === currentState.currentSong?.song_url,
          );

          if (foundIndex !== -1) {
            // Found the current song in the new list, preserve it
            newCurrentSong = songs[foundIndex];
            newCurrentIndex = foundIndex;
            console.log(
              "Preserving current song:",
              newCurrentSong.song_title,
              "at index",
              newCurrentIndex,
            );
          } else {
            // Current song not found, default to first song
            newCurrentSong = songs.length > 0 ? songs[0] : null;
            newCurrentIndex = 0;
            console.log(
              "Current song not found in new list, defaulting to first song",
            );
          }
        } else {
          // No current song, default to first
          newCurrentSong = songs.length > 0 ? songs[0] : null;
          newCurrentIndex = 0;
        }

        set({
          songs,
          currentSong: newCurrentSong,
          currentSongIndex: newCurrentIndex,
          // Preserve playing state if we found the same song
          isPlaying:
            currentState.currentSong &&
            newCurrentSong &&
            currentState.currentSong.song_id === newCurrentSong.song_id
              ? currentState.isPlaying
              : false,
        });
      },

      // Set playing state (to be called from use-sound hooks)
      setIsPlaying: (playing) => set({ isPlaying: playing }),

      // Set audio initialized state
      setAudioInitialized: (initialized) =>
        set({ audioInitialized: initialized }),

      // Next song (with repeat queue and autoplay)
      nextSong: () => {
        const { songs, currentSongIndex, autoPlay } = get();
        if (songs.length === 0) return;

        const nextIndex = (currentSongIndex + 1) % songs.length; // Loop back to 0 when reaching end
        console.log(
          `Moving to next song: ${songs[nextIndex]?.song_title} (index ${nextIndex}), autoPlay: ${autoPlay}`,
        );

        set({
          currentSongIndex: nextIndex,
          currentSong: songs[nextIndex],
          isPlaying: autoPlay, // Auto-play if enabled
        });
      },

      // Previous song (with repeat queue and autoplay)
      previousSong: () => {
        const { songs, currentSongIndex, autoPlay } = get();
        if (songs.length === 0) return;

        const prevIndex =
          currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
        console.log(
          `Moving to previous song: ${songs[prevIndex]?.song_title} (index ${prevIndex}), autoPlay: ${autoPlay}`,
        );

        set({
          currentSongIndex: prevIndex,
          currentSong: songs[prevIndex],
          isPlaying: autoPlay, // Auto-play if enabled
        });
      },

      // Select specific song
      selectSong: (index, autoPlay) => {
        const { songs } = get();
        const shouldAutoPlay =
          autoPlay !== undefined ? autoPlay : get().autoPlay;

        if (index >= 0 && index < songs.length) {
          console.log(
            `Selecting song: ${songs[index]?.song_title} (index ${index}), autoPlay: ${shouldAutoPlay}`,
          );
          set({
            currentSongIndex: index,
            currentSong: songs[index],
            isPlaying: shouldAutoPlay,
          });
        }
      },

      // Toggle mute
      toggleMute: () => {
        set((state) => ({ isMuted: !state.isMuted }));
      },

      // Set volume
      setVolume: (volume) => {
        set({ volume });
      },

      // Set autoplay preference
      setAutoPlay: (autoPlay) => {
        set({ autoPlay });
      },

      // Clear the queue
      clearQueue: () => {
        set({
          songs: [],
          currentSong: null,
          currentSongIndex: 0,
          isPlaying: false,
        });
      },
    }),
    {
      name: "audio-storage", // unique name for localStorage
      partialize: (state) => ({
        // Only persist these fields
        volume: state.volume,
        isMuted: state.isMuted,
        autoPlay: state.autoPlay,
        songs: state.songs,
        currentSongIndex: state.currentSongIndex,
        currentSong: state.currentSong,
      }),
    },
  ),
);
