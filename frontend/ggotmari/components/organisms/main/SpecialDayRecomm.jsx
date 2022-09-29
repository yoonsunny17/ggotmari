import { useEffect, useState } from "react";
import FlowerCard from "../../atoms/index/FlowerCard";
import SpecialDayFlower from "../../molecules/main/SpecialDayFlower";
import FlowerPagination from "../../molecules/main/FlowerPagination";
import { useRouter } from "next/router";
import { getSituationTag } from "../../../api/recommend";

function SpecialDayRecomm() {
  // TODO: tab index button
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRecommended, setIsRecommended] = useState({
    tags: [
      {
        subjectId: "",
        kindId: "",
        kindImage: "",
      },
    ],
  });

  const tabClickHandler = (index) => {
    setActiveIndex(index);
    getSituationTag(
      index,
      (res) => {
        console.log(res.data);
        setIsRecommended(res.data);
        // setIsRecommended(res);
        // console.log(isRecommended);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // TODO: pagination
  const limit = 9;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const router = useRouter();

  useEffect(() => {
    getSituationTag(
      1,
      (res) => {
        console.log(res);
        // console.log(res.data.message);
        setIsRecommended(res.data);
      },
      (err) => {
        console.log(err);
      }
    ); // default value
  }, []);

  return (
    <div>
      <div className="grid grid-cols-6 mb-3">
        {tabContArr.map(({ category }, idx) => {
          if (idx >= 1) {
            return (
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
            );
          }
        })}
      </div>

      {/* // TODO: 각 카테고리 나중에 채워넣을 것 */}
      {/* Content */}
      <div>
        {/* 가족 */}
        {activeIndex === 1 && (
          <SpecialDayFlower isRecommended={isRecommended} />
        )}
        {/* 연인 */}
        {activeIndex === 2 && (
          <SpecialDayFlower isRecommended={isRecommended} />
        )}
        {/* 직장동료 */}
        {activeIndex === 3 && (
          <SpecialDayFlower isRecommended={isRecommended} />
        )}
        {/* 친구 */}
        {activeIndex === 4 && (
          <SpecialDayFlower isRecommended={isRecommended} />
        )}
        {/* 선생님 */}
        {activeIndex === 5 && (
          <SpecialDayFlower isRecommended={isRecommended} />
        )}
        {/* 기타 */}
        {activeIndex === 6 && (
          <SpecialDayFlower isRecommended={isRecommended} />
        )}
      </div>
    </div>
  );
}

const tabContArr = [
  { category: "전체" },
  { category: "가족" },
  { category: "연인" },
  { category: "직장동료" },
  { category: "친구" },
  { category: "선생님" },
  { category: "기타" },
];

export default SpecialDayRecomm;
