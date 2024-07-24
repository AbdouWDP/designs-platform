import { useEffect, useState } from "react";
import {
  fetchDesigns,
  fetchNiches,
  searchNiche,
} from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { GoPlusCircle } from "react-icons/go";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import DesignsSituation from "./DesignsSituation";
import DesignsTable from "./DesignsTable";
import { IoIosSearch } from "react-icons/io";

function Admin() {
  const navigate = useNavigate();
  const [niches, setNiches] = useState([]);
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetchNiches(setNiches);
      fetchDesigns(setDesigns);
    } else {
      navigate("/auth");
    }
  }, []);

  return (
    <>
      <section className="admin-panel w-screen flex justify-center items-center">
        <div className="container w-11/12 h-nine-five rounded-3xl bg-white flex justify-center items-center overflow-scroll">
          <div className="w-nine-five h-nine-five">
            <div className="flex justify-between">
              <p className="text-3xl font-bold mb-2 underline">All Designs:</p>
              <Link to="/admin/add_niche">
                <button className="w-40 h-10 bg-blue-500 hover:bg-blue-600 rounded-sm text-white font-semibold flex gap-1 items-center justify-center">
                  <p>Add Niche</p>
                  <span className="flex justify-center items-center text-xl">
                    <GoPlusCircle />
                  </span>
                </button>
              </Link>
            </div>
            <DesignsSituation designs={designs} />
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
            {niches.length > 6 ? (
              <div className="flex justify-end">
                <div className="page-changer flex gap-4">
                  <button className="prev-page-button w-14 h-8 rounded-sm text-white flex justify-center items-center bg-blue-500 text-3xl cursor-pointer duration-150 hover:bg-blue-600">
                    <span>
                      <FaCaretLeft />
                    </span>
                  </button>
                  <button className="naxt-page-button w-14 h-8 rounded-sm text-white flex justify-center items-center bg-blue-500 text-3xl cursor-pointer duration-150 hover:bg-blue-600">
                    <span>
                      <FaCaretRight />
                    </span>
                  </button>
                </div>
              </div>
            ) : null}
            <DesignsTable niches={niches} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Admin;
