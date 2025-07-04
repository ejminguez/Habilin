import pic from "@/assets/pictures/pic-1.jpeg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import flower3 from "@/assets/pictures/flower-3.webp";

const Memories = () => {
  return (
    <section className="p-4 relative">
      <h1 className="text-[3rem]  font-reenie">alaala</h1>

      <div className="max-w-sm mx-auto">
        <AspectRatio ratio={1} className="relative shadow-2xl">
          {/* Image in the background */}
          <img
            src={pic}
            alt="Memory"
            loading="lazy"
            className="w-full h-full object-cover rounded-lg"
          />

          {/* White gradient overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-24 pointer-events-none rounded-b-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #D5D5D5 92.58%)",
            }}
          />

          {/* see more */}
          <div className="flex items-center justify-center mx-auto relative -top-10">
            <Link to="/alaala" className="font-reenie text-[1.5rem]">
              See memories
            </Link>
            <ChevronRight />
          </div>
        </AspectRatio>
      </div>

      {/* BACKGROUND FLOWER */}
      <img
        src={flower3}
        loading="lazy"
        className="absolute top-[10%] left-[40%] scale-x-[-1] scale-120 -rotate-6"
      />
    </section>
  );
};

export default Memories;
