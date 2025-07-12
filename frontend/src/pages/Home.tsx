import Hero from "@/components/Home/Hero";
import Greetings from "@/components/Home/Greetings";
import MusicPlayer from "@/components/Home/MusicPlayer";
import Memories from "@/components/Home/Memories";
import HomeBucketList from "@/components/Home/HomeBucketList";
import Letters from "@/components/Home/Letters";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch(".fade-section", {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        }),
      start: "top 95%",
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="flex flex-col gap-20 w-[80%] mx-auto mb-20">
          <section className="fade-section opacity-0 translate-y-[50px]">
            <Hero />
          </section>
          <section className="fade-section opacity-0 translate-y-[50px]">
            <Greetings />
          </section>
          <section className="fade-section opacity-0 translate-y-[50px]">
            <MusicPlayer />
          </section>
          <section className="fade-section opacity-0 translate-y-[50px]">
            <Memories />
          </section>
          <section className="fade-section opacity-0 translate-y-[50px]">
            <HomeBucketList />
          </section>
          <section className="fade-section opacity-0 translate-y-[50px]">
            <Letters />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
