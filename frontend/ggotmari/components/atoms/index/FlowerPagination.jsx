import { useState } from "react";

function FlowerPagination({ total, limit, page, setPage }) {
  const pageNumbs = Math.ceil(total / limit);

  const pageNumHandler = () => {
    if (page === pageNumbs) {
      setPage(1);
    } else {
      setPage((current) => current + 1);
    }
  };

  return (
    <div>
      <button
        className="bg-extra4 text-white text-sm w-full py-2 my-4 rounded-md"
        onClick={pageNumHandler}
      >
        다른 꽃도 보여드릴게요
        <span className="ml-3">
          {page} / {pageNumbs}
        </span>
      </button>
    </div>
  );
}

export default FlowerPagination;
