import { create } from "zustand";
import type { Song } from "@/types";

interface AudioState {
  // Playback state
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  audioInitialized: boolean;

  // Queue management
  songs: Song[];
  currentSongIndex: number;
  currentSong: Song | null;

  // Actions
  setSongs: (songs: Song[]) => void;
  setIsPlaying: (playing: boolean) => void;
  setAudioInitialized: (initialized: boolean) => void;
  nextSong: () => void;
  previousSong: () => void;
  selectSong: (index: number) => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  isPlaying: false,
  isMuted: false,
  volume: 1,
  audioInitialized: false,
  songs: [],
  currentSongIndex: 0,
  currentSong: null,

  // Set songs and initialize first song
  setSongs: (songs) =>
    set({
      songs,
      currentSong: songs.length > 0 ? songs[0] : null,
      currentSongIndex: 0,
    }),

  // Set playing state (to be called from use-sound hooks)
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  // Set audio initialized state
  setAudioInitialized: (initialized) => set({ audioInitialized: initialized }),

  // Next song (with repeat queue)
  nextSong: () => {
    const { songs, currentSongIndex } = get();
    if (songs.length === 0) return;

    const nextIndex = (currentSongIndex + 1) % songs.length; // Loop back to 0 when reaching end
    set({
      currentSongIndex: nextIndex,
      currentSong: songs[nextIndex],
      isPlaying: false, // Reset playing state when changing songs
    });
  },

  // Previous song (with repeat queue)
  previousSong: () => {
    const { songs, currentSongIndex } = get();
    if (songs.length === 0) return;

    const prevIndex =
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    set({
      currentSongIndex: prevIndex,
      currentSong: songs[prevIndex],
      isPlaying: false, // Reset playing state when changing songs
    });
  },

  // Select specific song
  selectSong: (index) => {
    const { songs } = get();
    if (index >= 0 && index < songs.length) {
      set({
        currentSongIndex: index,
        currentSong: songs[index],
        isPlaying: false, // Reset playing state when changing songs
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
}));
