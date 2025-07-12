import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      const smoother = ScrollSmoother.get();

      if (smoother) {
        // slight delay ensures ScrollSmoother is fully initialized
        gsap.delayedCall(0.05, () => {
          smoother.scrollTo(0, true);
        });
      } else {
        // fallback for non-smooth pages
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    scrollToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTopOnRouteChange;
