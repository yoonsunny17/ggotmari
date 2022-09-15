function CollectionBtn({ category, isActive }) {
  return (
    <button
      className={`${
        isActive ? "bg-main" : "bg-font2 hover:cursor-pointer hover:bg-sub1"
      } w-full rounded-md h-full py-1 font-sans`}
    >
      {category}
    </button>
  );
}

export default CollectionBtn;
