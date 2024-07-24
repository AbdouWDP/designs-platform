import { useState } from "react";
import { addDesign } from "../../firebase/firebase";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

function SingleFileInput({ h }) {
  const [imgRef, setImageRef] = useState(null);

  function handleUpload(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageRef(url);
  }

  return (
    <div
      className={`single-input w-1/4 ${
        h ? "h-96" : "h-40"
      } max-md:w-full relative`}
    >
      <input
        className="add-niche-images absolute top-0 left-0 opacity-0 w-full h-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        accept="image/png"
        type="file"
        name="design_image"
        onChange={(e) => handleUpload(e)}
      />
      {imgRef === null ? (
        <div className="w-full h-full bg-gray-700 rounded-md text-white flex justify-center items-center text-3xl">
          <span>
            <FaPlus />
          </span>
        </div>
      ) : (
        <div className="w-full h-full relative">
          <img
            src={imgRef}
            alt=""
            className="uploaded-image w-full h-full object-contain rounded-md"
          />

          {/* {progress === 100 ? (
            <span
              className="absolute text-5xl text-white top-1/2 left-1/2 rounded-full p-4 bg-green-700"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <FaCheck />
            </span>
          ) : (
            <div
              className="absolute top-1/2 left-1/2 w-11/12 h-4 rounded-sm border border-gray-900"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div
                className="w-full h-full bg-green-700"
                style={{ width: `${Math.floor(progress)}%` }}
              ></div>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}

export default SingleFileInput;
