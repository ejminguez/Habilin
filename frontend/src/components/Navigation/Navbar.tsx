import stamp from "@/assets/pictures/stamp.webp";
import navbar from "@/assets/pictures/navbar-elements.webp";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-transparent text-white sticky top-0 z-50 h-24">
      <img
        src={navbar}
        loading="eager"
        className="w-full xl:w-[30%] mx-auto hover:scale-115 transition-all duration-300"
      />
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
