import HeroText from "@/components/ui/HeroText";
import LetterList from "@/components/Letter/LetterList";

const Letters = () => {
  return (
    <section className="relative top-[20vh] mb-20 flex flex-col">
      <HeroText
        title="liham"
        subtitle="words we’ve left behind, written, and tucked between the pages of memory"
      />
      <LetterList />
    </section>
  );
};

export default Letters;
