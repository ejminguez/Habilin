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

    // Create ScrollSmoother
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });

    (gsap.utils.toArray(".fade-section") as HTMLElement[]).forEach(
      (section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              end: "bottom 5%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      },
    );
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className="flex flex-col gap-20 w-[80%] mx-auto mb-20">
          <section className="fade-section">
            <Hero />
          </section>
          <section className="fade-section">
            <Greetings />
          </section>
          <section className="fade-section">
            <MusicPlayer />
          </section>
          <section className="fade-section">
            <Memories />
          </section>
          <section className="fade-section">
            <HomeBucketList />
          </section>
          <section className="fade-section">
            <Letters />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
