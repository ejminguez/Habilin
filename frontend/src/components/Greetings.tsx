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
        className="absolute top-[70%] right-[5%]"
      />
      <img
        src={flower4}
        loading="lazy"
        className="absolute top-0 left-0 scale-[150%]"
      />
    </section>
  );
};

export default Greetings;
