import { LuPencil } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { deleteNiche, fetchNicheDesings } from "../../firebase/firebase";
import { useEffect, useState } from "react";

function DesignRow({ niche, index }) {
  const [nicheDesigns, setNicheDesigns] = useState([]);

  useEffect(() => {
    fetchNicheDesings(niche.id, setNicheDesigns);
  }, [niche]);

  return (
    <>
      <tr
        key={niche.id}
        className="text-lg w-full h-16 cursor-pointer hover:bg-blue-500 hover:text-white hover:border-0 duration-150 rounded-md border-b-2 border-black"
      >
        <td>
          <p> {index + 1} </p>
        </td>
        <td>
          <Link to={`/designs/${niche.id}`}>
            <img
              src={nicheDesigns.length > 0 && nicheDesigns[0].image}
              alt=""
              className="w-14 h-14 object-contain"
            />
          </Link>
        </td>
        <td>
          <Link to={`/designs/${niche.id}`}>
            <p className="line-clamp-2">{niche.name}</p>
          </Link>
        </td>
        <td>
          <p>{nicheDesigns.length}</p>
        </td>
        <td>
          <div className="w-full h-full flex gap-2">
            <Link to={`/admin/edit_niche/${niche.id}`}>
              <button className="edit-niche w-10 h-10 bg-green-600 hover:bg-green-700 text-white text-xl flex justify-center items-center rounded-sm">
                <span>
                  <LuPencil />
                </span>
              </button>
            </Link>
            <button
              className="delete-niche w-10 h-10 bg-red-500 hover:bg-red-700 text-white text-xl flex justify-center items-center rounded-sm"
              onClick={() => deleteNiche(niche.id)}
            >
              <span>
                <FaRegTrashCan />
              </span>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

function DesignsTable({ niches }) {
  return (
    <table className="designs-table w-full">
      <thead className="w-full">
        <tr>
          <th className="w-1/6 text-start">Id</th>
          <th className="w-1/6 text-start">Image</th>
          <th className="w-2/6 text-start">Niche</th>
          <th className="w-1/6 text-start">Designs count</th>
          <th className="w-1/6 text-start">Actions</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {niches && niches.length > 0
          ? niches.map((niche, index) => (
              <DesignRow niche={niche} index={index} />
            ))
          : null}
      </tbody>
    </table>
  );
}

export default DesignsTable;
