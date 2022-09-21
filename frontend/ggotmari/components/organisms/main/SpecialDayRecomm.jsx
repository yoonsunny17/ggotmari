import { useState } from "react";
import FlowerCard from "../../atoms/index/FlowerCard";
import SpecialDayFlower from "../../molecules/main/SpecialDayFlower";
import FlowerPagination from "../../molecules/main/FlowerPagination";

function SpecialDayRecomm() {
  // TODO: tab index button
  const [activeIndex, setActiveIndex] = useState(0);
  const tabClickHandler = (index) => {
    setActiveIndex(index);
    console.log(`${index}`);
  };

  // TODO: pagination
  const limit = 9;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  return (
    <div>
      <div className="grid grid-cols-6 mb-3">
        {tabContArr.map(({ category }, idx) => (
          <div key={category} className="col-span-1 px-[2px]">
            <button
              key={"tab-" + idx}
              onClick={() => tabClickHandler(idx)}
              className={`${
                activeIndex === idx
                  ? "bg-main"
                  : "bg-extra4 hover:cursor-pointer hover:bg-sub1"
              } w-full rounded-md h-full py-1 font-sans`}
            >
              <span className="text-white text-xs">{category}</span>
            </button>
          </div>
        ))}
      </div>

      {/* // TODO: 각 카테고리 나중에 채워넣을 것 */}
      {/* Content */}
      <div>
        {/* 가족 */}
        {activeIndex === 0 && <SpecialDayFlower />}
        {/* 연인 */}
        {activeIndex === 1 && <SpecialDayFlower />}
        {/* 친구 */}
        {activeIndex === 2 && <SpecialDayFlower />}
        {/* 선생님 */}
        {activeIndex === 3 && <SpecialDayFlower />}
        {/* 직장동료 */}
        {activeIndex === 4 && <SpecialDayFlower />}
        {/* 기타 */}
        {activeIndex === 5 && <SpecialDayFlower />}
      </div>
    </div>
  );
}

const tabContArr = [
  { category: "가족" },
  { category: "연인" },
  { category: "친구" },
  { category: "선생님" },
  { category: "직장동료" },
  { category: "기타" },
];

export default SpecialDayRecomm;
