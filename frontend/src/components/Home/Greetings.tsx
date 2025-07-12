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
        ease: "sine.inOut",
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
    <section className="relative min-h-[300px] flex flex-col justify-center">
      <div className="flex flex-col text-center">
        <h1
          className="font-lore text-[3rem] text-habilin-red"
          ref={typewriterRef}
        />
        <p className="font-reenie text-[3rem]">my love</p>
      </div>

      {/* Background */}
      <img
        src={flower4}
        loading="lazy"
        className="absolute top-[65%] -right-[30%] will-change-transform"
        width={150}
        height={150}
        alt="flower"
      />
      <img
        src={flower4}
        loading="lazy"
        className="absolute -top-[50%] -left-[25%] will-change-transform"
        width={200}
        height={200}
        alt="flower"
      />
    </section>
  );
};

export default Greetings;
