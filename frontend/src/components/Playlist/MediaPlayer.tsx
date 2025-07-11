import { Music4, Volume2, VolumeX } from "lucide-react";
import { LucidePlay, SkipForward, SkipBack, LucidePause } from "lucide-react";
import { useGlobalAudioManager } from "@/hooks/useGlobalAudioManager";

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

  // Handle next song with auto-play
  const handleNextSong = () => {
    console.log("Next song clicked");
    handleNext();
  };

  // Handle previous song with auto-play
  const handlePreviousSong = () => {
    console.log("Previous song clicked");
    handlePrevious();
  };

  return (
    <section className="flex flex-col py-4">
      <div className="flex flex-col gap-6 bg-transparent backdrop-blur-md rounded-lg w-[85%] lg:w-[50%] xl:w-[30%] mx-auto p-4 shadow-2xl">
        <div className="flex flex-col justify-center items-center">
          <div>
            {currentSong?.song_cover_art_url ? (
              <img
                src={currentSong?.song_cover_art_url}
                className="rounded-2xl"
              />
            ) : (
              <Music4 width={150} height={150} />
            )}
          </div>
          <div>
            <div className="text-center">
              {/* song title */}
              <p className="text-[2.5rem] font-reenie">
                {currentSong?.song_title || "No Song Selected"}
              </p>
              {/* song artist */}
              <p>{currentSong?.song_artist || "Unknown Artist"}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-center justify-center">
          <button
            onClick={handlePreviousSong}
            disabled={!currentSong}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
          >
            <SkipBack
              className={`${!currentSong ? "text-gray-400" : "text-black hover:text-gray-600"}`}
            />
          </button>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleTogglePlay}
              disabled={!currentSong}
              className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
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
            onClick={handleNextSong}
            disabled={!currentSong}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
          >
            <SkipForward
              className={`${!currentSong ? "text-gray-400" : "text-black hover:text-gray-600"}`}
            />
          </button>

          <button
            onClick={toggleMute}
            disabled={!currentSong || !audioInitialized}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
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
