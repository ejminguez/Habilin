import stamp from "@/assets/pictures/stamp.webp";
import navbar from "@/assets/pictures/navbar-elements.webp";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#smooth-content",
        start: "top top+=20",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (self.direction === 1) {
            // Scrolling down
            gsap.to(navRef.current, {
              y: -50,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            // Scrolling up
            gsap.to(navRef.current, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
      },
    });

    return () => tl.kill();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[9999] h-24 bg-transparent text-white transition-transform duration-300"
    >
      <img src={navbar} loading="eager" className="w-full xl:w-[35%] mx-auto" />
      <div
        style={{
          backgroundImage: `url(${stamp})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-20 h-20 flex justify-center items-center mx-auto -top-10 relative cursor-pointer hover:scale-110 transition-all duration-500"
      >
        <Link to="/" className="font-reenie text-center text-white">
          habilin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
