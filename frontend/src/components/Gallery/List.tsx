import { useState, useEffect } from "react";
import type { Image } from "@/types";
import { Skeleton } from "../ui/skeleton";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/assets/images.json");
      if (!res.ok) {
        console.error("Error fetching images.");
      }
      const json = await res.json();
      setImages(json);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="flex flex-col min-h-screen justify-center pb-50">
      {loading ? (
        <div className="p-6">
          <ul className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <li
                key={i}
                className="break-inside-avoid shadow-xl rounded-lg overflow-hidden"
              >
                <Skeleton className="w-full h-[250px] rounded-lg" />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-6">
          <ul className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((image) => (
              <li
                key={image.image_id}
                className="break-inside-avoid shadow-xl rounded-lg overflow-hidden"
              >
                <img
                  src={image.image_url}
                  className="w-full object-cover"
                  alt=""
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default List;
