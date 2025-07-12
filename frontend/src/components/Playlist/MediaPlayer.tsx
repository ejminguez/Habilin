import {
  Music4,
  Volume2,
  VolumeX,
  LucidePlay,
  SkipForward,
  SkipBack,
  LucidePause,
} from "lucide-react";
import { useGlobalAudioManager } from "@/hooks/useGlobalAudioManager";
import { useEffect, useState } from "react";

const MediaPlayer = () => {
  const {
    handleTogglePlay,
    handleNext,
    handlePrevious,
    audioInitialized,
    currentSong,
    isPlaying,
    isMuted,
    toggleMute,
  } = useGlobalAudioManager();

  const [hasInteracted, setHasInteracted] = useState(false);

  // Trigger deferred mount on user interaction
  useEffect(() => {
    const onInteraction = () => setHasInteracted(true);
    window.addEventListener("click", onInteraction, { once: true });
    return () => window.removeEventListener("click", onInteraction);
  }, []);

  if (!hasInteracted) return null;

  const showControls = !!currentSong;

  return (
    <section className="flex flex-col py-4">
      <div className="flex flex-col gap-6 bg-transparent backdrop-blur-md rounded-lg w-[85%] lg:w-[50%] xl:w-[30%] mx-auto p-4 shadow-2xl">
        <div className="flex flex-col justify-center items-center">
          {currentSong?.song_cover_art_url ? (
            <img
              src={currentSong.song_cover_art_url}
              alt={`${currentSong.song_title} cover`}
              loading="lazy"
              width={150}
              height={150}
              className="rounded-2xl"
            />
          ) : (
            <Music4 width={150} height={150} />
          )}
          <div className="text-center mt-2">
            <p className="text-[2.5rem] font-reenie">
              {currentSong?.song_title || "No Song Selected"}
            </p>
            <p>{currentSong?.song_artist || "Unknown Artist"}</p>
          </div>
        </div>

        <div className="flex gap-6 items-center justify-center">
          <button
            onClick={handlePrevious}
            disabled={!showControls}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
            aria-label="Previous Song"
          >
            <SkipBack
              className={
                showControls
                  ? "text-black hover:text-gray-600"
                  : "text-gray-400"
              }
            />
          </button>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleTogglePlay}
              disabled={!showControls}
              className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <LucidePause className="w-8 h-8" />
              ) : (
                <LucidePlay className="w-8 h-8" />
              )}
            </button>
            {!audioInitialized && currentSong && (
              <p className="text-xs text-gray-500">Click to start audio</p>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={!showControls}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
            aria-label="Next Song"
          >
            <SkipForward
              className={
                showControls
                  ? "text-black hover:text-gray-600"
                  : "text-gray-400"
              }
            />
          </button>

          <button
            onClick={toggleMute}
            disabled={!showControls || !audioInitialized}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-red-500" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MediaPlayer;
