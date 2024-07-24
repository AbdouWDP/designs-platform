import { useState } from "react";
import { addNiche } from "../../firebase/firebase";
import SingleFileInput from "./SingleFileInput";
import { useNavigate } from "react-router-dom";

function AddNiche() {
  const [imagesList, setImagesList] = useState([]);
  const navigate = useNavigate();

  return (
    <section className="add-niche w-screen">
      <form
        className="add-niche-form w-1/2 max-lg:w-4/5 max-xl:w-3/5 mt-4 flex flex-col gap-4 m-auto my-4"
        onSubmit={(e) => {
          addNiche(e);
          navigate("/admin");
        }}
      >
        <div className="w-full max-lg:w-11/12 m-auto">
          <label
            htmlFor="niche_name"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Niche Name
          </label>
          <input
            type="text"
            id="niche-name"
            className="bg-gray-50 h-12 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Niche Name"
            name="niche"
            required
          />
        </div>
        {/* <p className="block text-base font-medium text-gray-900">
          Upload Designs
        </p> */}
        {/* <div className="upload-designs w-full h-fit max-lg:w-11/12 m-auto flex justify-between gap-2 max-md:flex-wrap">
          <SingleFileInput setImagesList={setImagesList} />
          <SingleFileInput setImagesList={setImagesList} />
          <SingleFileInput setImagesList={setImagesList} />
          <SingleFileInput setImagesList={setImagesList} />
        </div> */}
        <button
          type="submit"
          className="text-blue-700 w-full max-lg:w-11/12 m-auto hover:text-white border-2 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default AddNiche;
