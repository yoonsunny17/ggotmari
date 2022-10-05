function FlowerTag({ flowerName, isRemovable, onClick }) {
  return (
    <p
      className={
        "bg-extra2 inline-block rounded-md text-white" +
        (isRemovable
          ? "text-sm px-2 py-0.5 mr-2 my-1"
          : "text-xs px-2 py-[1px] mr-1")
      }
      onClick={onClick}
    >
      #{flowerName}
    </p>
  );
}

export default FlowerTag;
