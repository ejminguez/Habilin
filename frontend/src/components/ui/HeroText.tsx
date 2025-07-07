import { Volume2, VolumeOff } from "lucide-react";
import { useAudioStore } from "@/store/useAudioStore";

interface HeroTextProps {
  className?: string;
  title: string;
  subtitle: string;
}

const HeroText = (HeroTextProps: HeroTextProps) => {
  const { play, setPlay } = useAudioStore();
  return (
    <div className="flex flex-col mx-auto w-[50%] text-center h-[40vh] items-center justify-center relative">
      <div className="flex flex-col items-center">
        {play ? (
          <Volume2 width={24} height={24} onClick={() => setPlay(false)} />
        ) : (
          <VolumeOff width={24} height={24} onClick={() => setPlay(true)} />
        )}
        <h1 className="text-[3rem]">{HeroTextProps.title}</h1>
      </div>
      <p className="font-reenie text-2xl">{HeroTextProps.subtitle}</p>
    </div>
  );
};

export default HeroText;
