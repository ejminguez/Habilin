import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navigation/Navbar.tsx";
import ScrollToTopOnRouteChange from "@/wrapper/ScrollToTopOnRouteChange.tsx";
import GlobalMediaPlayer from "@/components/GlobalMediaPlayer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

const App = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
      smoothTouch: 0.5,
    });
  }, []);
  return (
    <main className="relative">
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <ScrollToTopOnRouteChange />
          <main className="flex flex-col min-h-screen">
            <section className="relative min-h-screen overflow-x-clip">
              <Outlet />
            </section>
          </main>
        </div>
      </div>
      <GlobalMediaPlayer />
    </main>
  );
};

export default App;
