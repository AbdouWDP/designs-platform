import { fetchNiches, searchNiche } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import NicheCard from "./NicheCard";

function DesignsLayout() {
  const [niches, setNiches] = useState([]);

  useEffect(() => {
    fetchNiches(setNiches);
  }, []);

  return (
    <section className="w-full my-4">
      <div className="all-niches w-full flex justify-center gap-2 flex-wrap">
        <div className="search-field w-full h-14 mb-2 relative">
          <input
            type="search"
            autoComplete="off"
            placeholder="Search Niche"
            className="w-full h-full p-4 outline-none border-2 border-gray-700 rounded-sm"
            onChange={(e) => {
              if (e.target.value !== "") {
                searchNiche(e.target.value, setNiches);
              } else {
                fetchNiches(setNiches);
              }
            }}
          />

          <span
            className="absolute top-1/2 right-4 text-3xl"
            style={{ transform: "translateY(-50%)" }}
          >
            <IoIosSearch />
          </span>
        </div>
        {niches && niches.length > 0
          ? niches.map((niche) => <NicheCard niche={niche} />)
          : null}
      </div>
    </section>
  );
}

export default DesignsLayout;
