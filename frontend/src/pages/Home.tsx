import Hero from "../components/Hero";
import Greetings from "@/components/Greetings";
import MusicPlayer from "@/components/MusicPlayer";

const Home = () => {
  return (
    <main className="flex flex-col gap-20 w-[80%] mx-auto mb-20">
      <Hero />
      <Greetings />
      <MusicPlayer />
    </main>
  );
};

export default Home;
