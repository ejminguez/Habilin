import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Letter } from "@/types";
import paperTexture from "@/assets/pictures/paper-texture.webp";

const Letters = () => {
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState<Letter[]>([]);

  const fetchLetters = async () => {
    setLoading(true);

    try {
      const res = await fetch("/assets/letters.json");
      if (!res.ok) {
        console.log("Error getting letters");
      }
      const json = await res.json();
      console.log(json);
      setLetter(json);
    } catch (error) {
      console.error(error);
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
    <section className="flex flex-col w-full h-full min-h-screen justify-center">
      <h1 className="text-[3rem] font-reenie">liham</h1>
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <p>Writing letters...</p>
        </div>
      ) : (
        <div
          className="h-[60vh] w-full rounded-2xl shadow-2xl px-2 overflow-y-hidden relative"
          style={{
            backgroundImage: `url(${paperTexture})`,
            backgroundPosition: "center",
            backgroundSize: "150%",
          }}
        >
          {/* White gradient overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-28 pointer-events-none rounded-b-lg backdrop-blur-[2px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #D5D5D5 75%)",
            }}
          />
          {/* see more */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <Link to="/liham" className="font-reenie text-[1.5rem]">
              See letters
            </Link>
            <ChevronRight />
          </div>
          <ul className="flex flex-col p-4">
            {letter.length > 0 ? (
              <li key={letter[0].letter_id}>
                <div className="grid gap-4 font-reenie text-[1.5rem]">
                  <h4 className="text-right">{letter[0].date_sent}</h4>
                  <h3>dear {letter[0].recipient}</h3>
                  <p className="text-center">{letter[0].letter_content}</p>
                  <div className="text-right">
                    <p>yours truly,</p>
                    <h3>{letter[0].sender}</h3>
                  </div>
                </div>
              </li>
            ) : (
              <div className="flex items-center justify-center h-[50vh]">
                <p>Nooo.... no letters found T~T</p>
              </div>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Letters;
