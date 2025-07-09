import Hero from "@/components/Home/Hero";
import Greetings from "@/components/Home/Greetings";
import MusicPlayer from "@/components/Home/MusicPlayer";
import Memories from "@/components/Home/Memories";
import HomeBucketList from "@/components/Home/HomeBucketList";
import Letters from "@/components/Home/Letters";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="flex flex-col gap-20 w-[80%] mx-auto mb-20">
          <Hero />
          <Greetings />
          <MusicPlayer />
          <Memories />
          <HomeBucketList />
          <Letters />
        </main>
      </div>
    </div>
  );
};

export default Home;
