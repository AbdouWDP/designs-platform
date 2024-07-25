import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteDesign,
  fetchDesignComments,
  updateDesign,
} from "../../firebase/firebase";
import { FaRegTrashCan, FaArrowsRotate } from "react-icons/fa6";

function EditNicheDesignCard({ design, setSeeComment, setDesignComment }) {
  const [commentsLength, setCommentsLength] = useState([]);

  useEffect(() => {
    fetchDesignComments(design.id, setCommentsLength);
  }, []);

  return (
    <div
      className="edit-niche-card bg-white rounded-md"
      style={{ height: "500px" }}
      key={design.id}
    >
      <Link to={`/designs/${design.nicheId}`}>
        <div
          className="w-full cursor-pointer overflow-hidden"
          style={{ height: "80%" }}
        >
          <img
            src={design.image}
            alt=""
            className="w-full h-full object-contain duration-500 hover:scale-110"
          />
        </div>
      </Link>
      <div className="w-full flex" style={{ height: "10%" }}>
        <button
          className="w-full h-full flex justify-center items-center gap-2 text-white font-semibold text-lg bg-red-500 hover:bg-red-600"
          onClick={() => deleteDesign(design)}
        >
          <span>Delete</span>
          <span>
            <FaRegTrashCan />
          </span>
        </button>
        <div className="w-full h-full relative flex justify-center items-center gap-2 text-white font-semibold text-lg bg-blue-500 hover:bg-blue-600">
          <input
            type="file"
            accept="image/png"
            className="w-full h-full cursor-pointer absolute top-0 left-0 opacity-0"
            onChange={(e) => updateDesign(design, e.target)}
          />
          <span>Change</span>
          <span>
            <FaArrowsRotate />
          </span>
        </div>
      </div>
      <div
        className="see-design-comments w-full cursor-pointer bg-gray-700 hover:bg-gray-800 text-white text-lg font-semibold flex justify-center items-center"
        style={{ height: "10%", borderRadius: "0 0 6px 6px" }}
      >
        <button
          className="w-full h-full"
          onClick={() => {
            fetchDesignComments(design.id, setDesignComment);
            setSeeComment(true);
          }}
        >
          See Comment (
          {commentsLength && commentsLength.length > 0
            ? commentsLength.length
            : 0}
          )
        </button>
      </div>
    </div>
  );
}

export default React.memo(EditNicheDesignCard);
