import { CirclePlay, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { useAudioStore } from "@/store/useAudioStore";

const Queue = () => {
  const [loading, setLoading] = useState(false);
  const {
    songs,
    currentSongIndex,
    isPlaying,
    audioInitialized,
    setSongs,
    selectSong,
    setAudioInitialized,
  } = useAudioStore();

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/assets/songs.json");
      if (!res.ok) {
        console.log("Error getting songs");
        return;
      }
      const json = await res.json();
      console.log(json);
      setSongs(json); // This will set songs in global state
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleSongClick = (index: number) => {
    selectSong(index);
    // Initialize audio context on first interaction if needed
    if (!audioInitialized) {
      setAudioInitialized(true);
    }
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
                className={`flex gap-6 items-center rounded-lg w-[80%] mx-auto p-4 cursor-pointer transition-colors ${
                  isCurrentSong
                    ? "bg-blue-100 border-2 border-blue-300"
                    : "bg-white hover:bg-gray-50"
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
