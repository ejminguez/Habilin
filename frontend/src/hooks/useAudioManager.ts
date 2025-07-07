import { useEffect, useRef, useState } from "react";
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
  const [soundUrl, setSoundUrl] = useState<string>("");

  // Update sound URL when current song changes
  useEffect(() => {
    if (currentSong?.song_url) {
      setSoundUrl(currentSong.song_url);
    }
  }, [currentSong]);

  // Configure use-sound with current song URL
  const [play, { stop, pause, sound }] = useSound(soundUrl, {
    volume: isMuted ? 0 : volume,
    preload: true,
    onend: () => {
      console.log("Song ended, moving to next");
      setIsPlaying(false);
      nextSong();
    },
    onplay: () => {
      console.log("Song started playing");
      setIsPlaying(true);
    },
    onpause: () => {
      console.log("Song paused");
      setIsPlaying(false);
    },
    onload: () => {
      console.log("Audio loaded successfully");
      if (!audioInitialized) {
        setAudioInitialized(true);
      }
    },
    onloaderror: (error) => {
      console.error("Error loading audio:", error);
    },
  });

  // Update volume when mute/volume changes
  useEffect(() => {
    if (sound) {
      sound.volume(isMuted ? 0 : volume);
    }
  }, [sound, isMuted, volume]);

  // Handle song changes
  useEffect(() => {
    const currentSongUrl = currentSong?.song_url;

    if (previousSongRef.current !== currentSongUrl) {
      console.log(
        "Song changed from",
        previousSongRef.current,
        "to",
        currentSongUrl,
      );

      // Stop previous song if it exists
      if (previousSongRef.current && sound) {
        stop();
      }

      // Update the ref to current song
      previousSongRef.current = currentSongUrl || null;
    }
  }, [currentSong, sound, stop]);

  // Handle play/pause toggle with proper audio context initialization
  const handleTogglePlay = async () => {
    if (!currentSong?.song_url) {
      console.warn("No current song to play");
      return;
    }

    try {
      if (isPlaying) {
        console.log("Pausing audio");
        pause();
      } else {
        console.log("Starting audio playback");
        // This will initialize the audio context on first user interaction
        play();

        if (!audioInitialized) {
          setAudioInitialized(true);
        }
      }
    } catch (error) {
      console.error("Error toggling audio playback:", error);
    }
  };

  return {
    handleTogglePlay,
    stopCurrentSong: stop,
    audioInitialized,
    sound, // Expose sound object for debugging
  };
};
