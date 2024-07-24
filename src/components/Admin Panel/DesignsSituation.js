import React from "react";
import { FaListCheck } from "react-icons/fa6";
import { FaArrowsRotate, FaRegTrashCan } from "react-icons/fa6";

function DesignsSituation({ designs }) {
  const approvedDesigns = designs.filter(
    (design) => design.status === "approved"
  );
  const updateDesigns = designs.filter((design) => design.status === "update");
  const denyDesigns = designs.filter((design) => design.status === "deny");

  return (
    <div className="designs-situation my-4 flex gap-2">
      <div className="approved cursor-pointer relative w-1/3 h-32 bg-green-600 rounded-sm flex justify-center items-center gap-2 text-white font-semibold text-5xl">
        <p className="absolute top-1 left-2 text-sm">Approved</p>
        <p> {approvedDesigns.length} </p>
        <span>
          <FaListCheck />
        </span>
      </div>
      <div className="update cursor-pointer relative w-1/3 h-32 bg-yellow-500 rounded-sm flex justify-center items-center gap-2 text-white font-semibold text-5xl">
        <p className="absolute top-1 left-2 text-sm">Update</p>
        <p> {updateDesigns.length} </p>
        <span>
          <FaArrowsRotate />
        </span>
      </div>
      <div className="denied cursor-pointer relative w-1/3 h-32 bg-red-500 rounded-sm flex justify-center items-center gap-2 text-white font-semibold text-5xl">
        <p className="absolute top-1 left-2 text-sm">Denied</p>
        <p> {denyDesigns.length} </p>
        <span>
          <FaRegTrashCan />
        </span>
      </div>
    </div>
  );
}

export default DesignsSituation;
