import React, { useState } from "react";
import { useFetch } from "./helper/usefetch";
function App() {
  // Hooks
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  // Functions
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    return setSearch(value);
  };
  const searching = () => {
    return useFetch
      .get("gallery", {
        params: {
          name: search,
        },
      })
      .then((res) => {
        const { data } = res;
        if (data) {
          const { result } = data;
          return setData(result);
        }
      });
  };
  return (
    <div className="w-full h-screen flex-col items-center flex justify-start overflow-auto">
      <div
        className="flex items-center justify-center py-20 w-full bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000')",
        }}
      >
        <input
          type="text"
          className="text-xl ring-transparent focus:shadow-none border-2 font-light border-gray-300 px-4 py-2 w-[500px] rounded-l-full"
          onChange={handleChange}
          placeholder="Search Here..."
          value={search}
        />
        <button
          onClick={searching}
          className="py-2 px-8 text-xl bg-sky-800 text-white -ml-1 rounded-r-full"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-4 gap-10 mt-20">
        {data?.length === 0 ? (
          <div className="w-full col-span-4 h-[400px] flex items-center justify-center">
            <h4 className="text-xl font-bold tracking-wider text-gray-500">Please Search To See Image</h4>
          </div>
        ) : (
          data?.map((v, k) => {
            return (
              <img
                className="object-fit w-[350px] h-[350px] rounded-lg shadow"
                src={v}
                key={k}
                alt={k}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
