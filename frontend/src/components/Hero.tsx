import flower2 from "@/assets/pictures/flower-2.webp";
import flower1 from "@/assets/pictures/flower-1.webp";
import { Volume2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="flex">
      {/* HERO SECTION */}
      <div className="flex flex-col mx-auto w-[50%] text-center h-[40vh] items-center justify-center relative">
        <div className="flex flex-col items-center">
          <Volume2 width={24} height={24} />
          <h1 className="text-[3rem]">habilin</h1>
        </div>
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
          width={300}
          height={300}
        />
        <img
          src={flower1}
          loading="lazy"
          className="absolute top-5 left-[60%] -rotate-20 -z-50"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
};

export default Hero;
