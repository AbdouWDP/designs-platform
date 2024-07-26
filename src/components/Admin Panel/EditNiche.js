import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleFileInput from "./SingleFileInput";
import {
  addNicheDesigns,
  fetchNicheDesings,
  fetchSingleNiche,
} from "../../firebase/firebase";
import EditNicheDesignCard from "./EditNicheDesignCard";

function EditNiche() {
  const { nicheId } = useParams();
  const [niche, setNiche] = useState({});
  const [nicheDesigns, setNicheDesigns] = useState([]);
  const [designComment, setDesignComment] = useState([]);
  const [seeComment, setSeeComment] = useState(false);

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
      <>
        {seeComment ? (
          <section
            className="comment-overlay w-screen h-screen absolute top-1/2 left-1/2 flex justify-center items-center z-50"
            style={{
              transform: "translate(-50%, -50%)",
              background: "rgba(0,0,0,0.9)",
            }}
            onClick={() => setSeeComment(false)}
          >
            <div className="comment-reader w-1/2 h-80 bg-white p-2 shadow-xl rounded-md">
              <p>
                {designComment.length > 0
                  ? designComment[0].comment
                  : "No Comments"}
              </p>
            </div>
          </section>
        ) : null}

        {nicheDesigns.length < 4 ? (
          <section className="w-3/4 m-auto my-4 max-lg:w-11/12">
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => addNicheDesigns(e, niche)}
            >
              <p className="block font-semibold text-xl text-gray-900">
                Upload Designs
              </p>
              <div className="upload-designs w-full h-fit max-lg:w-11/12 m-auto flex gap-2 max-md:flex-wrap">
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
                  <EditNicheDesignCard
                    design={design}
                    setDesignComment={setDesignComment}
                    setSeeComment={setSeeComment}
                  />
                );
              })
            : null}
        </section>
      </>
    </>
  );
}

export default EditNiche;
