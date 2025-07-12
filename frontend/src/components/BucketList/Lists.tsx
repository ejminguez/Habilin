import { useEffect, useState } from "react";
import type { Dream } from "@/types";
import flower4 from "@/assets/pictures/flower-4-medium.webp";

const Lists = () => {
  const [loading, setLoading] = useState(false);
  const [bucketList, setBucketList] = useState<Dream[]>([]);

  const fetchBucketList = async () => {
    setLoading(true);
    try {
      const res = await fetch("/assets/bucketList.json");
      if (!res.ok) {
        console.log("Error fetching bucket list...");
        return;
      }
      const json = await res.json();
      setBucketList(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBucketList();
  }, []);

  const toggleDreamStatus = (index: number) => {
    setBucketList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, dream_status: !item.dream_status } : item,
      ),
    );
  };

  return (
    <div className="min-h-screen mb-40">
      <ul className="flex flex-col items-center w-[90%] gap-4 bg-gray-200 mx-auto px-4 py-6 rounded-lg">
        {loading ? (
          <div className="flex items-center gap-2">
            <img src={flower4} width={50} height={50} />
            <p>Fetching dreams...</p>
          </div>
        ) : (
          bucketList.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 rounded-lg bg-gray-50 py-2 px-6 w-[95%] mx-auto shadow-xl"
            >
              <input
                type="checkbox"
                checked={item.dream_status}
                onChange={() => toggleDreamStatus(index)}
              />
              <p
                className={`font-reenie text-[1.5rem] ${
                  item.dream_status ? "line-through text-gray-400" : ""
                }`}
              >
                {item.dream_description}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Lists;
