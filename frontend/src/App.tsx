import { Outlet } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navigation/Navbar.tsx";
import ScrollToTopOnRouteChange from "@/wrapper/ScrollToTopOnRouteChange.tsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Lazy load heavy components
const GlobalMediaPlayer = lazy(() => import("@/components/GlobalMediaPlayer"));

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    if (!isMobile) {
      import("gsap/ScrollSmoother").then(({ ScrollSmoother }) => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

          ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
            smoothTouch: 0.1,
          });
        });
      });
    }
  }, [isMobile]);

  return (
    <main className="relative">
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <ScrollToTopOnRouteChange />
          <div className="flex flex-col min-h-screen">
            <div className="relative min-h-screen overflow-x-clip">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div />}>
        <GlobalMediaPlayer />
      </Suspense>
    </main>
  );
};

export default App;
