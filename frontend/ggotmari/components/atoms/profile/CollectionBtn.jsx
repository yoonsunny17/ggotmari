function CollectionBtn({ category, activeTab, index, onClick }) {
  return (
    <button
      className={`${
        activeTab === index
          ? "bg-main"
          : "bg-extra4 hover:cursor-pointer hover:bg-sub1"
      } w-full rounded-md h-full py-1 font-sans`}
      onClick={onClick}
    >
      <span className="text-white text-sm">{category}</span>
    </button>
  );
}

export default CollectionBtn;
