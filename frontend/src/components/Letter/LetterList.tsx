import type { Letter } from "@/types";
import { useState, useEffect } from "react";
import yellowPaperTexture from "@/assets/pictures/yellowPaperTexture.webp";

const LetterList = () => {
  const [loading, setLoading] = useState(false);
  const [letters, setLetters] = useState<Letter[]>([]);

  const fetchLetters = async () => {
    setLoading(true);

    try {
      const res = await fetch("/assets/letters.json");
      if (!res.ok) {
        console.log("Error fetching letters");
        return;
      }
      const json = await res.json();
      console.log(json);
      setLetters(json);
    } catch (error) {
      console.error(error);
      return;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  return (
    <section className="mb-[10rem]">
      <div>
        <ul className="flex flex-col p-4 gap-6">
          {loading ? (
            <div>
              <p className="text-center">Loading letters...</p>
            </div>
          ) : (
            letters.map((letter) => (
              <li key={letter.letter_id} className="w-[95%] mx-auto">
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
                    <p className="text-center">{letter.letter_content}</p>
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
