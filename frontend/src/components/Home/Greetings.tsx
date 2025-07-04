import flower4 from "@/assets/pictures/flower-4-medium.svg";

const Greetings = () => {
  return (
    <section className="relative">
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
        className="absolute top-[70%] right-[5%] animate-[spin_50s_linear_infinite]"
      />
      <img
        src={flower4}
        loading="lazy"
        className="absolute top-0 left-0 scale-[150%] animate-[spin_50s_linear_infinite]"
      />
    </section>
  );
};

export default Greetings;
