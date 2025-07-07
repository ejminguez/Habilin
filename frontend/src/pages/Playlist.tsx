import HeroText from "@/components/ui/HeroText";
import MediaPlayer from "@/components/Playlist/MediaPlayer";
import Queue from "@/components/Playlist/Queue";

const Playlist = () => {
  return (
    <section className="relative">
      <HeroText
        title="himig"
        subtitle="the songs that speak when words fall short"
      />
      <div className="flex flex-col gap-10">
        <MediaPlayer />
        <Queue />
      </div>
    </section>
  );
};

export default Playlist;
