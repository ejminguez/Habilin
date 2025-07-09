import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { List } from "@/types";

const HomeBucketList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<List[]>([]);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch("/assets/bucketList.json");
      if (!res.ok) {
        console.log("Error getting response.");
      }
      const json = await res.json();
      console.log(json);
      setList(json);
    } catch (error) {
      console.log("Error fetching data: ", error);
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <section className="flex flex-col w-full min-h-screen justify-center">
      <h1 className="text-[3rem] font-reenie text-right">pangarap</h1>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className="flex w-full bg-habilin-gray h-[50vh] rounded-lg relative py-2 shadow-2xl">
          {/* White gradient overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-24 pointer-events-none rounded-b-lg backdrop-blur-[2px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #D5D5D5 75%)",
            }}
          />

          {/* see more */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <Link to="/pangarap" className="font-reenie text-[1.5rem]">
              See bucketlist
            </Link>
            <ChevronRight />
          </div>

          <ul className="flex flex-col gap-4 w-full overflow-y-scroll py-6">
            {list.length > 0 ? (
              list.map((item) => (
                <li
                  key={item.task_id}
                  className="flex items-center gap-4 rounded-lg bg-gray-50 py-2 px-6 w-[80%] mx-auto shadow-xl"
                >
                  <input type="checkbox" />
                  <p className="font-reenie text-[1.5rem]">{item.task}</p>
                </li>
              ))
            ) : (
              <p className="text-center text-white text-lg">
                Add your pangarap(s) teehee
              </p>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default HomeBucketList;
