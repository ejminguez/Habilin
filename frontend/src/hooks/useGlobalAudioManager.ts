import { useEffect, useRef } from "react";
import { useAudioStore } from "@/store/useAudioStore";

// Singleton audio element to prevent multiple instances
let globalAudioElement: HTMLAudioElement | null = null;
let isInitialized = false;

export const useGlobalAudioManager = () => {
  const {
    isPlaying,
    isMuted,
    volume,
    currentSong,
    audioInitialized,
    autoPlay,
    setIsPlaying,
    setAudioInitialized,
    nextSong,
    previousSong,
    toggleMute,
  } = useAudioStore();

  const previousSongRef = useRef<string | null>(null);
  const shouldAutoPlayRef = useRef<boolean>(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Initialize global audio element ONCE
  useEffect(() => {
    if (!globalAudioElement && !isInitialized) {
      console.log("Initializing global audio element");
      isInitialized = true;
      globalAudioElement = new Audio();
      
      // Prevent multiple audio elements from playing
      globalAudioElement.preload = "metadata";

      // Basic event listeners
      globalAudioElement.addEventListener("play", () => {
        console.log("Audio started playing");
        setIsPlaying(true);
      });

      globalAudioElement.addEventListener("pause", () => {
        console.log("Audio paused");
        setIsPlaying(false);
      });

      globalAudioElement.addEventListener("ended", () => {
        console.log("Audio ended, moving to next song");
        setIsPlaying(false);
        
        // Get current autoPlay setting from store
        const currentAutoPlay = useAudioStore.getState().autoPlay;
        shouldAutoPlayRef.current = currentAutoPlay;
        console.log("Auto-play enabled for next song:", currentAutoPlay);
        
        // Move to next song
        nextSong();
      });

      globalAudioElement.addEventListener("error", (e) => {
        console.error("Audio error:", e);
        console.error("Audio source:", globalAudioElement?.src);
        setIsPlaying(false);
      });

      globalAudioElement.addEventListener("canplay", () => {
        console.log("Audio ready to play");
        if (!audioInitialized) {
          setAudioInitialized(true);
        }
        
        // Auto-play if requested
        if (shouldAutoPlayRef.current) {
          console.log("Auto-playing new song");
          handlePlay().then(() => {
            shouldAutoPlayRef.current = false;
          }).catch((error) => {
            console.error("Auto-play failed:", error);
            shouldAutoPlayRef.current = false;
          });
        }
      });

      globalAudioElement.addEventListener("loadstart", () => {
        console.log("Audio load started");
      });

      globalAudioElement.addEventListener("loadeddata", () => {
        console.log("Audio data loaded");
      });
    }

    // Cleanup function - but don't destroy the global element
    return () => {
      // Cancel any pending play promises
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {
          // Ignore AbortError when component unmounts
        });
      }
    };
  }, []); // Empty dependency array - only run once

  // Handle song changes
  useEffect(() => {
    const currentSongUrl = currentSong?.song_url;

    if (
      globalAudioElement &&
      currentSongUrl &&
      previousSongRef.current !== currentSongUrl
    ) {
      console.log("Song change detected:", currentSong?.song_title);
      console.log("Previous URL:", previousSongRef.current);
      console.log("New URL:", currentSongUrl);

      // Cancel any pending play promise
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {
          // Ignore AbortError when changing songs
        });
        playPromiseRef.current = null;
      }

      // Only pause if we're actually changing to a different song
      if (previousSongRef.current !== null) {
        globalAudioElement.pause();
        globalAudioElement.currentTime = 0;
      }

      // Validate and set new source
      const fullUrl = `${window.location.origin}${currentSongUrl}`;
      console.log("Setting audio source to:", fullUrl);

      // Test if URL is valid before setting
      fetch(fullUrl, { method: "HEAD" })
        .then((response) => {
          if (response.ok) {
            console.log("Audio file is accessible");
            if (globalAudioElement && globalAudioElement.src !== fullUrl) {
              globalAudioElement.src = fullUrl;
              previousSongRef.current = currentSongUrl;

              // If the store says we should be playing, set autoplay flag
              if (isPlaying) {
                shouldAutoPlayRef.current = true;
              }
            }
          } else {
            console.error("Audio file not accessible:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error checking audio file:", error);
        });
    }
  }, [currentSong?.song_url]); // Only depend on the URL, not the entire song object

  // Handle playing state changes from store
  useEffect(() => {
    if (globalAudioElement && currentSong) {
      if (isPlaying && globalAudioElement.paused) {
        handlePlay();
      } else if (!isPlaying && !globalAudioElement.paused) {
        handlePause();
      }
    }
  }, [isPlaying, currentSong]);

  // Handle volume and mute changes
  useEffect(() => {
    if (globalAudioElement) {
      globalAudioElement.volume = isMuted ? 0 : volume;
    }
  }, [isMuted, volume]);

  const handlePlay = async () => {
    if (!globalAudioElement || !currentSong?.song_url) return;

    try {
      // Cancel any existing play promise
      if (playPromiseRef.current) {
        await playPromiseRef.current.catch(() => {});
      }

      // Start new play promise
      playPromiseRef.current = globalAudioElement.play();
      await playPromiseRef.current;
      playPromiseRef.current = null;

      if (!audioInitialized) {
        setAudioInitialized(true);
      }
    } catch (error) {
      playPromiseRef.current = null;
      if (error.name !== 'AbortError') {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
  };

  const handlePause = () => {
    if (globalAudioElement) {
      // Cancel any pending play promise
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {});
        playPromiseRef.current = null;
      }
      globalAudioElement.pause();
    }
  };

  const handleTogglePlay = async () => {
    if (!currentSong?.song_url || !globalAudioElement) {
      console.warn("Cannot play: missing song or audio element");
      return;
    }

    try {
      if (isPlaying) {
        console.log("Pausing audio");
        handlePause();
      } else {
        console.log("Playing audio");
        
        // Make sure we have the right source
        const expectedSrc = `${window.location.origin}${currentSong.song_url}`;
        if (globalAudioElement.src !== expectedSrc) {
          console.log("Updating audio source before play");
          globalAudioElement.src = expectedSrc;
        }

        await handlePlay();
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error toggling audio playback:", error);
        setIsPlaying(false);
      }
    }
  };

  const stopCurrentSong = () => {
    if (globalAudioElement) {
      handlePause();
      globalAudioElement.currentTime = 0;
    }
  };

  const handleNext = () => {
    console.log("Next song clicked");
    shouldAutoPlayRef.current = autoPlay;
    nextSong();
  };

  const handlePrevious = () => {
    console.log("Previous song clicked");
    shouldAutoPlayRef.current = autoPlay;
    previousSong();
  };

  return {
    handleTogglePlay,
    stopCurrentSong,
    audioInitialized,
    audioElement: globalAudioElement,
    currentSong,
    isPlaying,
    isMuted,
    toggleMute,
    handleNext,
    handlePrevious,
  };
};
