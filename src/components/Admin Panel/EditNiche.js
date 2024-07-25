import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SingleFileInput from "./SingleFileInput";
import {
  addNicheDesigns,
  deleteDesign,
  fetchNicheDesings,
  fetchSingleNiche,
  updateDesign,
} from "../../firebase/firebase";
import { FaRegTrashCan, FaArrowsRotate } from "react-icons/fa6";

function EditNiche() {
  const { nicheId } = useParams();
  const [niche, setNiche] = useState({});
  const [nicheDesigns, setNicheDesigns] = useState([]);

  useEffect(() => {
    fetchSingleNiche(nicheId, setNiche);
    fetchNicheDesings(nicheId, setNicheDesigns);
  }, []);

  function inputsJsx() {
    const maxLength = 4;
    const designsLength = nicheDesigns.length;
    const result = maxLength - designsLength;
    let inputs = [];
    for (var i = 0; i < result; i++) {
      inputs.push(<SingleFileInput />);
    }
    return inputs;
  }

  return (
    <>
      {nicheDesigns.length < 4 ? (
        <section className="w-3/4 m-auto my-4 max-lg:w-11/12">
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => addNicheDesigns(e, niche)}
          >
            <p className="block font-semibold text-xl text-gray-900">
              Upload Designs
            </p>
            <div className="upload-designs w-full h-fit max-lg:w-11/12 m-auto flex justify-between gap-2 max-md:flex-wrap">
              {inputsJsx().map((input) => input)}
            </div>
            <button
              type="submit"
              className="text-blue-700 w-full max-lg:w-11/12 m-auto hover:text-white border-2 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </section>
      ) : null}
      <section className="w-3/4 m-auto flex gap-2 flex-wrap my-4 max-lg:w-11/12">
        {nicheDesigns && nicheDesigns.length > 0
          ? nicheDesigns.map((design) => {
              return (
                <div
                  className="edit-niche-card bg-white rounded-md"
                  style={{ height: "500px" }}
                  key={design.id}
                >
                  <Link to={`/designs/${design.nicheId}`}>
                    <div
                      className="w-full cursor-pointer overflow-hidden"
                      style={{ height: "90%" }}
                    >
                      <img
                        src={design.image}
                        alt=""
                        className="w-full h-full object-contain duration-500 hover:scale-110"
                      />
                    </div>
                  </Link>
                  <div className="w-full flex" style={{ height: "10%" }}>
                    <div
                      style={{ borderRadius: "0 0 0 6px" }}
                      className="w-full h-full relative flex justify-center items-center gap-2 text-white font-semibold text-lg bg-blue-500 hover:bg-blue-600"
                    >
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
                    <button
                      style={{ borderRadius: "0 0 6px 0" }}
                      className="w-full h-full flex justify-center items-center gap-2 text-white font-semibold text-lg bg-red-500 hover:bg-red-600"
                      onClick={() => deleteDesign(design)}
                    >
                      <span>Delete</span>
                      <span>
                        <FaRegTrashCan />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </section>
    </>
  );
}

export default EditNiche;
