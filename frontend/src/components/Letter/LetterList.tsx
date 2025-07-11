import type { Letter } from "@/types";
import { useState, useEffect, useRef } from "react";
import yellowPaperTexture from "@/assets/pictures/yellowPaperTexture.webp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LetterList = () => {
  const [loading, setLoading] = useState(false);
  const [letters, setLetters] = useState<Letter[]>([]);
  const containerRef = useRef<HTMLUListElement>(null);

  const fetchLetters = async () => {
    setLoading(true);
    try {
      const res = await fetch("/assets/letters.json");
      if (!res.ok) {
        console.log("Error fetching letters");
        return;
      }
      const json = await res.json();
      setLetters(json);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  // Animate each letter when they are loaded
  useEffect(() => {
    if (!letters.length || loading) return;

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray(".letter-card") as HTMLElement[];

        console.log("Found cards:", cards.length); // Debug log

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        ScrollTrigger.refresh();
      }, containerRef);

      return () => {
        ctx.revert();
        clearTimeout(timer);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [letters, loading]); // Add loading as dependency

  return (
    <section className="mb-[10rem]">
      <div>
        <ul ref={containerRef} className="flex flex-col p-4 gap-6">
          {loading ? (
            <div>
              <p className="text-center">Loading letters...</p>
            </div>
          ) : (
            letters.map((letter) => (
              <li
                key={letter.letter_id}
                className="w-[95%] mx-auto letter-card opacity-0" // Start hidden
              >
                <div
                  className="min-h-[60vh] w-full rounded-2xl shadow-xl p-6 overflow-y-hidden relative"
                  style={{
                    backgroundImage: `url(${yellowPaperTexture})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="grid gap-4 font-reenie text-[1.5rem] ">
                    <h4 className="text-right">{letter.date_sent}</h4>
                    <h3>dear {letter.recipient}</h3>
                    <div className="text-center font-urbanist space-y-4 text-sm">
                      {letter.letter_content.split("\n\n").map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    <div className="text-right">
                      <p>yours truly,</p>
                      <h3>{letter.sender}</h3>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default LetterList;
