import React from "react";
import { addDesignComment } from "../firebase/firebase";

function SingleDesignHalf({ nicheDesigns, setBgColor, imgIndex }) {
  const colors = ["white", "red", "black", "blue", "green", "pink", "gray"];
  return (
    <div className="single-half-design w-1/2 h-4/5 flex flex-col items-center max-lg:w-full max-lg:my-4">
      <div
        className="single-half-container h-4/5 max-lg:h-fit"
        style={{ width: "98%" }}
      >
        <h1 className="text-gray-900 text-3xl font-bold">
          {nicheDesigns[0].name}
        </h1>
        <p>Design Count: {nicheDesigns.length} </p>
        <div className="design-background-color my-2 flex flex-wrap gap-4">
          {colors.map((color) => (
            <button
              className="color w-12 h-12 rounded-sm cursor-pointer"
              data-color={color}
              style={{ backgroundColor: color }}
              onClick={() => setBgColor(color)}
            ></button>
          ))}
        </div>
      </div>
      <div
        className="comment-form h-1/5 mb-2 max-lg:h-fit max-lg:mb-10"
        style={{ width: "98%" }}
      >
        <form
          className="w-full h-full"
          onSubmit={(e) => addDesignComment(e, nicheDesigns[imgIndex].id)}
        >
          <textarea
            placeholder="Add Comment..."
            name="comment"
            className="w-full h-3/5 mb-1 resize-none outline-none p-2 rounded-sm border border-black focus:border-none focus:outline focus:outline-blue-400 focus:outline-offset-2"
          ></textarea>
          <button
            type="submit"
            className="w-full h-2/5 m-auto hover:text-white bg-blue-500 hover:bg-blue-700 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(SingleDesignHalf);
