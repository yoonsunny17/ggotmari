function CollectionBtn({ category, isActive, onClick }) {
  return (
    <button
      className={`${
        isActive ? "bg-main" : "bg-[#D9D9D9] hover:cursor-pointer hover:bg-sub1"
      } w-full rounded-md h-6 font-sansultralight text-white text-xs`}
      onClick={onClick}
    >
      {category}
    </button>
  );
}

export default CollectionBtn;
