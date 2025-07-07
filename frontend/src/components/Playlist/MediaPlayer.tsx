import { Music4 } from "lucide-react";
import {
  LucidePlay,
  SkipForward,
  SkipBack,
  LucideCircleStop,
} from "lucide-react";
import { useAudioStore } from "@/store/useAudioStore";

const MediaPlayer = () => {
  const { play, setPlay } = useAudioStore();

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
              <p className="text-[2.5rem] font-reenie">Stuck with U</p>
              {/* song artist */}
              <p>Justin Bieber & Ariana Grande</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 items-center justify-center">
          <SkipBack />
          {play ? (
            <LucideCircleStop onClick={() => setPlay(false)} />
          ) : (
            <LucidePlay onClick={() => setPlay(true)} />
          )}
          <SkipForward />
        </div>
      </div>
    </section>
  );
};

export default MediaPlayer;
