import { FaCheck } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { RiFullscreenLine } from "react-icons/ri";
import { designSituationAction } from "../firebase/firebase";

function FirstImageSlide({ nicheDesigns, imgIndex, bgColor,setFullScreen }) {
  return (
    <div
      className="first-image-slide w-full h-4/5 rounded-md relative max-lg:rounded-none"
      style={{ backgroundColor: bgColor }}
      key={nicheDesigns[imgIndex].id}
    >
      <img
        src={nicheDesigns[imgIndex].image}
        alt=""
        className="w-full h-full object-contain"
      />
      <div className="design-actions absolute right-2 top-2 w-12 h-fit overflow-hidden flex gap-2 flex-col">
        <button
          onClick={() =>
            designSituationAction(nicheDesigns[imgIndex].id, "approved")
          }
          className="approve-button w-full aspect-square rounded-sm bg-green-600 hover:bg-green-700 text-white text-xl flex justify-center items-center"
        >
          <span>
            <FaCheck />
          </span>
        </button>
        <button
          onClick={() =>
            designSituationAction(nicheDesigns[imgIndex].id, "update")
          }
          className="update-button w-full aspect-square rounded-sm bg-yellow-500 hover:bg-yellow-600 text-white text-xl flex justify-center items-center"
        >
          <span>
            <FaArrowsRotate />
          </span>
        </button>
        <button
          onClick={() =>
            designSituationAction(nicheDesigns[imgIndex].id, "deny")
          }
          className="deny-button w-full aspect-square rounded-sm bg-red-500 hover:bg-red-600 text-white text-xl flex justify-center items-center"
        >
          <span>
            <CgClose />
          </span>
        </button>
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            setFullScreen(true);
          }}
          className="full-screen-button w-full hidden max-lg:flex aspect-square rounded-sm bg-gray-600 hover:bg-gray-700 text-white text-xl justify-center items-center"
        >
          <span>
            <RiFullscreenLine />
          </span>
        </button>
      </div>
    </div>
  );
}

export default FirstImageSlide;
