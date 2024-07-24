import { useParams } from "react-router-dom";
import {
  designSituationAction,
  fetchNicheDesings,
  fetchSingleDesign,
} from "../firebase/firebase";
import { useEffect, useState } from "react";
import SingleDesignHalf from "./SingleDesignHalf";
import { FaCheck } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { RiFullscreenLine } from "react-icons/ri";

function SingleDesign() {
  const { nicheId } = useParams();
  const [nicheDesigns, setNicheDesigns] = useState({});
  const [imgIndex, setImgIndex] = useState(0);
  const [bgColor, setBgColor] = useState("black");
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    fetchNicheDesings(nicheId, setNicheDesigns);
  }, []);

  useEffect(() => {
    if (fullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [fullScreen]);

  return (
    <>
      {fullScreen ? (
        <div
          className="overlay w-screen absolute hidden max-lg:flex justify-center items-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          onClick={() => setFullScreen(false)}
        >
          <img
            src={nicheDesigns[imgIndex].image}
            alt=""
            className="w-full aspect-square object-contain"
          />
        </div>
      ) : null}
      <section className="single-design-section w-screen h-screen flex justify-center items-center relative">
        <div
          className="w-11/12 flex max-lg:flex-col max-lg:w-full"
          style={{ height: "95%" }}
        >
          {Object.keys(nicheDesigns).length > 0 ? (
            <div className="image-slides w-1/2 h-full flex flex-col gap-2 max-lg:w-full">
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
                      designSituationAction(
                        nicheDesigns[imgIndex].id,
                        "approved"
                      )
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
              <div className="w-full h-1/5 flex gap-2 max-lg:w-nine-five max-lg:m-auto overflow-scroll">
                {nicheDesigns.map((design, index) => (
                  <div
                    key={design.id}
                    className="single-image-slide h-full bg-white overflow-hidden rounded-sm relative shrink-0 max-lg:w-2/5"
                    onClick={() => setImgIndex(index)}
                  >
                    <img
                      src={design.image}
                      alt=""
                      className="w-full h-full object-contain cursor-pointer duration-300 hover:scale-110"
                    />
                    {design.status === "pending" ? (
                      <div className="w-fit h-fit px-4 py-1 rounded-sm bg-gray-700 absolute right-1 top-1 text-white text-xs">
                        <p>Pending</p>
                      </div>
                    ) : null}
                    {design.status === "approved" ? (
                      <div className="w-fit h-fit px-4 py-1 rounded-sm bg-green-600 absolute right-1 top-1 text-white text-xs">
                        <p>Approved</p>
                      </div>
                    ) : null}
                    {design.status === "update" ? (
                      <div className="w-fit h-fit px-4 py-1 rounded-sm bg-yellow-500 absolute right-1 top-1 text-white text-xs">
                        <p>Update</p>
                      </div>
                    ) : null}
                    {design.status === "deny" ? (
                      <div className="w-fit h-fit px-4 py-1 rounded-sm bg-red-500 absolute right-1 top-1 text-white text-xs">
                        <p>Denied</p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {Object.keys(nicheDesigns).length > 0 && (
            <SingleDesignHalf
              nicheDesigns={nicheDesigns}
              setBgColor={setBgColor}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default SingleDesign;
