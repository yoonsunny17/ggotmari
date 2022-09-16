import { useState } from "react";

function NewRecommBtn() {
  const [pageNum, setPageNum] = useState(1);
  const pageNumHandler = () => {
    if (pageNum === 5) {
      setPageNum(1);
    } else {
      setPageNum((current) => current + 1);
    }
  };

  return (
    <button
      onClick={pageNumHandler}
      className="bg-extra4 text-white text-sm w-full py-2 my-4 rounded-md"
    >
      다른 꽃 추천해 드릴게요
      <span className="ml-3">{pageNum} / 5</span>
    </button>
  );
}

export default NewRecommBtn;
