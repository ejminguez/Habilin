import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="top-[10vh] relative min-h-screen">
        <Outlet />
      </section>
    </main>
  );
};

export default App;
