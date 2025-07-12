import { Music4, Volume2, VolumeX } from "lucide-react";
import { LucidePlay, SkipForward, SkipBack, LucidePause } from "lucide-react";
import { useGlobalAudioManager } from "@/hooks/useGlobalAudioManager";
import { useAudioStore } from "@/store/useAudioStore";

const GlobalMediaPlayer = () => {
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

  const { songs } = useAudioStore();

  // Don't render if no songs are loaded
  if (!songs.length || !currentSong) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-transparent border-t shadow-lg transition-all duration-300 backdrop-blur-md`}
    >
      <div className="container mx-auto px-4 h-full py-2">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              {currentSong.song_cover_art_url ? (
                <img
                  src={currentSong.song_cover_art_url}
                  className="rounded-lg"
                />
              ) : (
                <Music4 width={24} height={24} />
              )}
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-sm truncate max-w-[150px]">
                {currentSong.song_title}
              </p>
              <p className="text-xs text-gray-600 truncate max-w-[150px]">
                {currentSong.song_artist}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevious}
              className="hover:scale-110 transition-transform"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="hover:scale-110 transition-transform"
            >
              {isPlaying ? (
                <LucidePause className="w-6 h-6" />
              ) : (
                <LucidePlay className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="hover:scale-110 transition-transform"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={toggleMute}
              disabled={!audioInitialized}
              className="disabled:opacity-50 hover:scale-110 transition-transform"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-red-500" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMediaPlayer;
