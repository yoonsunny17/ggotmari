function FlowerTag({ flowerName, isRemovable }) {
  return (
    <p
      className={
        "bg-extra2 inline-block rounded-md text-white " +
        (isRemovable
          ? "text-sm px-3 py-1 mr-3 my-1"
          : "text-[3px] px-2 py-[1px] mr-1")
      }
    >
      #{flowerName}
    </p>
  );
}

export default FlowerTag;
