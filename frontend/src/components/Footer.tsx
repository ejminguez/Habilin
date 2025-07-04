import flower4 from "@/assets/pictures/flower-4.webp";

const Footer = () => {
  return (
    <section className="relative overflow-clip h-64 flex justify-center items-center mt-20">
      <h5 className="text-center text-white top-10 relative">@habilin2025</h5>
      {/* WHITE GRADIENT */}
      <div className="absolute bottom-0 w-full h-24 z-20 bg-gradient-to-t from-white to-transparent" />
      {/* BACKGROUND FLOWER */}
      <img src={flower4} loading="lazy" className="absolute top-0 -z-50" />
    </section>
  );
};

export default Footer;
