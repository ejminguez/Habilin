import { Music4, Volume2, VolumeX } from "lucide-react";
import { LucidePlay, SkipForward, SkipBack, LucidePause } from "lucide-react";
import { useAudioStore } from "@/store/useAudioStore";
import { useAudioManager } from "@/hooks/useAudioManager";

const MediaPlayer = () => {
  const {
    isPlaying,
    isMuted,
    currentSong,
    nextSong,
    previousSong,
    toggleMute,
  } = useAudioStore();

  const { handleTogglePlay, stopCurrentSong, audioInitialized } =
    useAudioManager();

  // Handle next song
  const handleNextSong = () => {
    stopCurrentSong();
    nextSong();
  };

  // Handle previous song
  const handlePreviousSong = () => {
    stopCurrentSong();
    previousSong();
  };

  return (
    <section className="flex flex-col py-4">
      <div className="flex flex-col gap-6 bg-white rounded-lg w-[80%] mx-auto p-4 shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <div>
            <Music4 width={150} height={150} />
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
