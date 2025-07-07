import { CirclePlay } from "lucide-react";
import { useState, useEffect } from "react";
import type { Song } from "@/types";

const Queue = () => {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/assets/songs.json");
      if (!res.ok) {
        console.log("Error getting songs");
      }
      const json = await res.json();
      console.log(json);
      setSongs(json);
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

  return (
    <section className="bg-red-400 py-4">
      <div className="h-[60vh] overflow-scroll">
        <ul className="flex flex-col gap-4">
          {songs.map((song) => (
            <li
              key={song.song_id}
              className="flex gap-6 items-center bg-white rounded-lg w-[80%] mx-auto p-4"
            >
              <div>
                <CirclePlay width={40} height={40} />
              </div>
              <div>
                <p className="font-reenie text-[1.3rem]">{song.song_title}</p>
                <p className="text-xs">{song.song_artist}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Queue;
