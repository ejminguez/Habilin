import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeOff } from "lucide-react";
import { useGlobalAudioManager } from "@/hooks/useGlobalAudioManager";

gsap.registerPlugin(ScrollTrigger);

interface HeroTextProps {
  className?: string;
  title: string;
  subtitle: string;
}

const HeroText = ({ className, title, subtitle }: HeroTextProps) => {
  const { isMuted, toggleMute } = useGlobalAudioManager();

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse", // replay on scroll in/out
          },
        },
      );

      // Animate subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
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
        <h1 ref={titleRef} className="text-[3rem]">
          {title}
        </h1>
      </div>
      <h2 ref={subtitleRef} className="font-reenie text-2xl">
        {subtitle}
      </h2>
    </div>
  );
};

export default HeroText;
