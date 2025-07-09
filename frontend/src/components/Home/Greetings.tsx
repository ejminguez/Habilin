import flower4 from "@/assets/pictures/flower-4-medium.webp";

const Greetings = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-lore text-[3rem] text-habilin-red">
          Happy Anniversary
        </h1>
        <p className="font-reenie text-[3rem]">my love</p>
      </div>

      {/* BACKGROUND FLOWERS */}
      <img
        src={flower4}
        loading="lazy"
        className="absolute top-[30%] -right-[30%] animate-[spin_50s_linear_infinite]"
        width={150}
        height={150}
      />
      <img
        src={flower4}
        loading="lazy"
        className="absolute -top-[30%] -left-[25%] animate-[spin_20s_linear_infinite]"
        width={200}
        height={200}
      />
    </section>
  );
};

export default Greetings;
