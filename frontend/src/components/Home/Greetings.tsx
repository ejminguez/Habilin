import flower4 from "@/assets/pictures/flower-4-medium.webp";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(TextPlugin);

const Greetings = () => {
  const typewriterRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const messages = ["HAPPY ANNIVERSARY", "I LOVE YOU"];

    let index = 0;

    const loopTyping = () => {
      const currentText = messages[index];

      gsap.to(typewriterRef.current, {
        duration: 2.5,
        text: currentText,
        ease: "sine",
        onComplete: () => {
          gsap.delayedCall(2, () => {
            index = (index + 1) % messages.length;
            loopTyping();
          });
        },
      });
    };

    loopTyping();
  }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-lore text-[3rem] text-habilin-red">
          <span ref={typewriterRef} />
        </h1>
        <p className="font-reenie text-[3rem]">my love</p>
      </div>

      {/* BACKGROUND FLOWERS */}
      <img
        src={flower4}
        loading="lazy"
        className="absolute top-[30%] -right-[30%] animate-[spin_50s_linear_infinite]"
        width={150}
        height={150}
      />
      <img
        src={flower4}
        loading="lazy"
        className="absolute -top-[30%] -left-[25%] animate-[spin_20s_linear_infinite]"
        width={200}
        height={200}
      />
    </section>
  );
};

export default Greetings;
