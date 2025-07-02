import stamp from "../assets/stamp.svg";
import navbar from "../assets/navbar-elements.svg";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-transparent text-white sticky top-0 z-50 h-24">
      <img src={navbar} loading="eager" width="100%" />
      <div
        style={{
          backgroundImage: `url(${stamp})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-20 h-20 flex justify-center items-center mx-auto -top-10 relative"
      >
        <Link to="/" className="font-reenie text-center text-white">
          habilin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
