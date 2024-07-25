function ImagesSlide({ design, index, setImgIndex }) {
  return (
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
  );
}

export default ImagesSlide;
