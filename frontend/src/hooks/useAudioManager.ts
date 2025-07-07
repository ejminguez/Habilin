import { useEffect, useRef } from "react";
import useSound from "use-sound";
import { useAudioStore } from "@/store/useAudioStore";

export const useAudioManager = () => {
  const {
    isPlaying,
    isMuted,
    volume,
    currentSong,
    audioInitialized,
    setIsPlaying,
    setAudioInitialized,
    nextSong,
  } = useAudioStore();

  const previousSongRef = useRef<string | null>(null);

  // Configure use-sound with current song
  const [play, { stop, pause }] = useSound(currentSong?.song_url || "", {
    volume: isMuted ? 0 : volume,
    onend: () => {
      setIsPlaying(false);
      nextSong(); // Auto-advance to next song
    },
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onload: () => {
      // Audio is loaded and ready
      if (!audioInitialized) {
        setAudioInitialized(true);
      }
    },
  });

  // Handle song changes
  useEffect(() => {
    const currentSongUrl = currentSong?.song_url;

    // If song changed, stop previous and potentially start new one
    if (previousSongRef.current !== currentSongUrl) {
      if (previousSongRef.current) {
        stop(); // Stop previous song
      }

      // Update the ref to current song
      previousSongRef.current = currentSongUrl || null;

      // If should be playing and audio is initialized, start the new song
      if (currentSongUrl && isPlaying && audioInitialized) {
        setTimeout(() => {
          play();
        }, 100);
      }
    }
  }, [currentSong, isPlaying, audioInitialized, play, stop]);

  // Handle play/pause toggle with audio context initialization
  const handleTogglePlay = async () => {
    if (!currentSong) return;

    try {
      if (isPlaying) {
        pause();
      } else {
        // First user interaction - this will initialize the audio context
        await play();
        if (!audioInitialized) {
          setAudioInitialized(true);
        }
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return {
    handleTogglePlay,
    stopCurrentSong: stop,
    audioInitialized,
  };
};
