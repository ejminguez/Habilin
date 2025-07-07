import { Volume2, VolumeOff } from "lucide-react";
import { useGlobalAudioManager } from "@/hooks/useGlobalAudioManager";

interface HeroTextProps {
  className?: string;
  title: string;
  subtitle: string;
}

const HeroText = ({ className, title, subtitle }: HeroTextProps) => {
  const { isMuted, toggleMute } = useGlobalAudioManager();

  return (
    <div
      className={`flex flex-col mx-auto w-[50%] text-center h-[40vh] items-center justify-center relative ${className}`}
    >
      <div className="flex flex-col items-center">
        <button onClick={toggleMute}>
          {isMuted ? (
            <VolumeOff width={24} height={24} />
          ) : (
            <Volume2 width={24} height={24} />
          )}
        </button>
        <h1 className="text-[3rem]">{title}</h1>
      </div>
      <p className="font-reenie text-2xl">{subtitle}</p>
    </div>
  );
};

export default HeroText;
