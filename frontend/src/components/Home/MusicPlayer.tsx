import vinyl from "@/assets/pictures/vinyl.webp";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import flower3 from "@/assets/pictures/flower-3.webp";
import { useGlobalAudioManager } from "@/hooks/useGlobalAudioManager";

const MusicPlayer = () => {
  const { currentSong } = useGlobalAudioManager();
  return (
    <section className="relative flex flex-col justify-center">
      <div className="flex flex-col items-center gap-5">
        <div>
          <img
            src={vinyl}
            loading="lazy"
            width="200"
            className="animate-[spin_10s_linear_infinite] cursor-pointer hover:scale-110 transition-all duration-500 mx-auto"
          />

          <div className="text-center">
            {/* song title */}
            <p className="text-[2rem] font-reenie">{currentSong?.song_title}</p>
            {/* song artist */}
            <p>{currentSong?.song_artist}</p>
          </div>
        </div>

        {/* see more */}
        <div>
          <Link to="/himig" className="flex items-center">
            <p className="font-reenie text-lg">See playlist</p>
            <ChevronRight />
          </Link>
        </div>
      </div>

      {/* BACKGROUND FLOWER */}
      <img
        src={flower3}
        loading="lazy"
        className="absolute top-[20%] right-[50%] -z-50 scale-[130%]"
      />
    </section>
  );
};

export default MusicPlayer;
