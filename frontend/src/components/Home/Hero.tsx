import flower2 from "@/assets/pictures/flower-2.webp";
import flower1 from "@/assets/pictures/flower-1.webp";
import HeroText from "@/components/ui/HeroText";

const Hero = () => {
  return (
    <section className="flex relative min-h-screen items-center">
      {/* HERO SECTION */}
      <HeroText
        title="habilin"
        subtitle="a space to hold what we leave for each other"
      />

      {/* BACKGROUND FLOWERS */}
      <div>
        <img
          src={flower2}
          loading="lazy"
          className="absolute top-[25%] right-[50%] rotate-6 -z-50"
          width={700}
          height={700}
        />
        <img
          src={flower1}
          loading="lazy"
          className="absolute top-[30%] left-[65%] -rotate-20 -z-50"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
};

export default Hero;
