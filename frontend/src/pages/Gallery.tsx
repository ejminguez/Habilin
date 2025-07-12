import List from "@/components/Gallery/List";
import HeroText from "@/components/ui/HeroText";

const Gallery = () => {
  return (
    <section className="relative top-[20vh] min-h-screen flex flex-col justify-center">
      <HeroText
        title="alaala"
        subtitle="the moments we’ve caught — fragments of light, frozen in time"
      />
      <List />
    </section>
  );
};

export default Gallery;
