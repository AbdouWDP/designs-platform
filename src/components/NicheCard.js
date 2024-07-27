import { useEffect, useState } from "react";
import { fetchNicheDesings } from "../firebase/firebase";
import { Link } from "react-router-dom";

function NicheCard({ niche }) {
  const [nicheDesigns, setNicheDesigns] = useState([]);

  useEffect(() => {
    fetchNicheDesings(niche.id, setNicheDesigns);
  }, [niche]);

  const approvedDesigns = nicheDesigns.filter(
    (design) => design.status === "approved"
  );

  return (
    <div
      key={niche.id}
      className="niche-card h-96 bg-white overflow-hidden rounded-md relative"
    >
      {approvedDesigns.length > 0 && approvedDesigns.length < 4 ? (
        <div className="niche-alert w-6 h-6 bg-red-500 flex justify-center items-center absolute top-0 right-0 z-50 rounded-full text-white text-xl font-bold">
          <p>!</p>
        </div>
      ) : null}
      <Link to={`/designs/${niche.id}`}>
        <img
          src={nicheDesigns.length > 0 && nicheDesigns[0].image}
          alt=""
          className="w-full h-4/5 object-contain cursor-pointer duration-500 hover:scale-110"
        />
        <div className="w-full h-1/5 bg-red-white flex items-center font-semibold">
          <p className="w-full px-2 line-clamp-2">{niche.name}</p>
        </div>
      </Link>
    </div>
  );
}

export default NicheCard;
