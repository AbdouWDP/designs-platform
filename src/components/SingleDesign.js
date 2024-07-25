import { useParams } from "react-router-dom";
import { fetchNicheDesings } from "../firebase/firebase";
import { useEffect, useState } from "react";
import SingleDesignHalf from "./SingleDesignHalf";
import ImagesSlide from "./ImagesSlide";
import FirstImageSlide from "./FirstImageSlide";

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
              <FirstImageSlide
                nicheDesigns={nicheDesigns}
                imgIndex={imgIndex}
                bgColor={bgColor}
                setFullScreen={setFullScreen}
              />
              <div className="w-full h-1/5 flex gap-2 max-lg:w-nine-five max-lg:m-auto overflow-scroll">
                {nicheDesigns.map((design, index) => (
                  <ImagesSlide
                    design={design}
                    index={index}
                    setImgIndex={setImgIndex}
                  />
                ))}
              </div>
            </div>
          ) : null}
          {Object.keys(nicheDesigns).length > 0 && (
            <SingleDesignHalf
              nicheDesigns={nicheDesigns}
              setBgColor={setBgColor}
              imgIndex={imgIndex}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default SingleDesign;
