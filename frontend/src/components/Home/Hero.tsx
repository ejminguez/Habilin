import flower2 from "@/assets/pictures/flower-2.png";
import flower1 from "@/assets/pictures/flower-1.png";
import clickHere from "@/assets/pictures/clickHere.svg";
import { Volume2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="flex relative">
      {/* HERO SECTION */}
      <div className="flex flex-col mx-auto w-[40%] text-center h-48 items-center justify-center">
        <Volume2 width={24} height={24} className="absolute top-0" />
        <h1 className="text-[3rem]">habilin</h1>
        <p className="font-reenie text-2xl">
          a space to hold what we leave for each other
        </p>
      </div>

      {/* BACKGROUND FLOWERS */}
      <div>
        <img
          src={flower2}
          loading="lazy"
          className="absolute top-0 right-[55%] rotate-6 -z-50 scale-130"
        />
        <img
          src={flower1}
          loading="lazy"
          className="absolute top-5 left-[55%] -rotate-12 -z-50"
          width={300}
        />
        <img
          src={clickHere}
          className="absolute -top-15 left-[20%] w-24 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Hero;
