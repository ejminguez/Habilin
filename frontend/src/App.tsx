import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navigation/Navbar.tsx";
import ScrollToTopOnRouteChange from "@/wrapper/ScrollToTopOnRouteChange.tsx";
import Footer from "@/components/Footer";

const App = () => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <ScrollToTopOnRouteChange />
      <section className="top-[10vh] relative min-h-screen overflow-x-clip">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default App;
