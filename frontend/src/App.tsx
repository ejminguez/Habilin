import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navigation/Navbar.tsx";
import ScrollToTopOnRouteChange from "@/wrapper/ScrollToTopOnRouteChange.tsx";
import Footer from "@/components/Footer";
import GlobalMediaPlayer from "@/components/GlobalMediaPlayer";

const App = () => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <ScrollToTopOnRouteChange />
      <section className="relative min-h-screen overflow-x-clip pb-32">
        <Outlet />
      </section>
      <Footer />
      <GlobalMediaPlayer />
    </main>
  );
};

export default App;
