import { CirclePlay, Pause } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAudioStore } from "@/store/useAudioStore";
import { useDebouncedSongSelection } from "@/hooks/useDebouncedSongSelection";

const Queue = () => {
  const [loading, setLoading] = useState(false);
  const hasInitiallyLoaded = useRef(false);

  const {
    songs,
    currentSongIndex,
    isPlaying,
    audioInitialized,
    forceSetSongs,
    selectSong,
    setAudioInitialized,
  } = useAudioStore();

  const fetchSongs = async () => {
    // Check if we need to load songs
    const needsLoading = songs.length === 0 || !hasInitiallyLoaded.current;

    if (!needsLoading) {
      console.log("Songs already loaded and initialized, skipping fetch");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/assets/songs.json");
      if (!res.ok) {
        console.log("Error getting songs");
        return;
      }
      const json = await res.json();
      console.log("Fetched songs:", json);
      console.log("Loading songs into store");
      forceSetSongs(json);
      hasInitiallyLoaded.current = true;
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Debounced song selection to prevent rapid clicking issues
  const handleSongSelection = useCallback(
    (index: number, autoPlay?: boolean) => {
      console.log("Selecting song:", index, songs[index]?.song_title);
      selectSong(index, autoPlay);

      // Initialize audio context on first interaction if needed
      if (!audioInitialized) {
        setAudioInitialized(true);
      }
    },
    [selectSong, audioInitialized, setAudioInitialized, songs],
  );

  const debouncedSelectSong = useDebouncedSongSelection(
    handleSongSelection,
    200,
  );

  const handleSongClick = (index: number) => {
    console.log("Song clicked:", index, songs[index]?.song_title);

    // Prevent clicking the same song that's already selected
    if (index === currentSongIndex) {
      console.log("Same song clicked, ignoring");
      return;
    }

    // Use debounced selection
    debouncedSelectSong(index, true);
  };

  if (loading) {
    return (
      <section className="py-4">
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-white text-lg">Loading songs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="h-[60vh] overflow-scroll">
        <ul className="flex flex-col gap-4">
          {songs.map((song, index) => {
            const isCurrentSong = index === currentSongIndex;
            const isCurrentlyPlaying = isCurrentSong && isPlaying;

            return (
              <li
                key={song.song_id}
                className={`flex gap-6 items-center rounded-lg w-[85%] mx-auto p-4 cursor-pointer transition-colors shadow-2xl ${
                  isCurrentSong
                    ? "border-2 border-blue-300 bg-transparent"
                    : "bg-transparent backdrop-blur-md hover:bg-gray-50"
                }`}
                onClick={() => handleSongClick(index)}
              >
                <div>
                  {isCurrentlyPlaying ? (
                    <Pause width={40} height={40} className="text-blue-600" />
                  ) : (
                    <CirclePlay
                      width={40}
                      height={40}
                      className={
                        isCurrentSong ? "text-blue-600" : "text-gray-600"
                      }
                    />
                  )}
                </div>
                <div>
                  <p
                    className={`font-reenie text-[1.3rem] ${
                      isCurrentSong
                        ? "text-blue-800 font-semibold"
                        : "text-black"
                    }`}
                  >
                    {song.song_title}
                  </p>
                  <p
                    className={`text-xs ${
                      isCurrentSong ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {song.song_artist}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Queue;
