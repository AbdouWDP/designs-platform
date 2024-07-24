import React from "react";

function SingleDesignHalf({ nicheDesigns, setBgColor }) {
  const colors = ["white", "red", "black", "blue", "green", "pink", "gray"];
  return (
    <div className="w-1/2 h-full flex justify-center max-lg:w-full max-lg:my-4 pb-8">
      <div className="h-full" style={{ width: "98%" }}>
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
    </div>
  );
}

export default React.memo(SingleDesignHalf);
