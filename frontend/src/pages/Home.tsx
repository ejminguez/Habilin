import Hero from "../components/Hero";
import Greetings from "@/components/Greetings";
import MusicPlayer from "@/components/MusicPlayer";
import Memories from "@/components/Home/Memories";
import HomeBucketList from "@/components/Home/HomeBucketList";
import Letters from "@/components/Home/Letters";

const Home = () => {
  return (
    <main className="flex flex-col gap-20 w-[80%] mx-auto mb-20">
      <Hero />
      <Greetings />
      <MusicPlayer />
      <Memories />
      <HomeBucketList />
      <Letters />
    </main>
  );
};

export default Home;
