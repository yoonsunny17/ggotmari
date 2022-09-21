import { useState, useEffect } from "react";

function FlowerDetail(params) {
  const [duplicated, setDuplicated] = useState(["없음"]);
  useEffect(() => {
    if (duplicated.length === 7 || duplicated.length === 0) {
      setDuplicated(["없음"]);
    }
  }, [duplicated]);

  const handleDuplicated = (e) => {
    console.log(e.target.innerText);
    const isIncludes = duplicated.find((el) => el === e.target.innerText);

    if (e.target.value === "없음") {
      setDuplicated(["없음"]);
    } else if (isIncludes) {
      setDuplicated(duplicated.filter((el) => el !== e.target.innerText));
    } else if (duplicated.length > 0) {
      setDuplicated([
        ...duplicated.filter((el) => el !== "없음"),
        e.target.innerText,
      ]);
    }
    // console.log(duplicated);
  };

  return (
    <div>
      <img
        className="w-full aspect-square object-cover"
        src={flowerInfo.kinds.kindImage}
        alt="flower image"
      />
      <div className="px-6 pt-6 divide-y divide-sub1 divide-opacity-60">
        {/* 품종명, 품목명, 꽃말 */}
        <div>
          <div className="font-gangwon text-2xl font-medium mb-1">
            {/* 품종명, 품목명 */}
            {flowerInfo.kinds.kindName}, {flowerInfo.flower.subjectName}
          </div>
          {/* 꽃말 */}
          <div className="font-sans text-font2 text-base mb-4">
            {flowerInfo.flower.subjectName}의 꽃말은{" "}
            {/* 꽃말 부분만 bold 강조 */}
            <span className="font-bold">
              {flowerInfo.flower.subjectLanguage}
            </span>{" "}
            입니다
          </div>
        </div>

        {/* 컬렉션에 담기 */}
        <div>
          <div className="font-gangwon text-lg py-4">컬렉션에 담기</div>
          <div className="grid grid-cols-6 mb-3">
            {tabContArr.map(({ category }, idx) => (
              <div key={category} className="col-span-1 px-[2px]">
                <button
                  onClick={handleDuplicated}
                  key={idx}
                  className={`${
                    duplicated.includes(`${category}`)
                      ? "bg-main"
                      : "bg-extra4 hover:cursor-pointer hover:bg-sub1"
                  } w-full rounded-md h-full py-1 font-sans`}
                >
                  <span className="text-white text-xs">{category}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* 다른 품종 보기 */}
        <div className="font-gangwon text-lg py-4">
          {flowerInfo.flower.subjectName}의 다른 품종
        </div>

        {/* 연관 게시물 보기 */}
        <div className="font-gangwon text-lg py-4">
          {flowerInfo.flower.subjectName}를 담은 이야기
        </div>
      </div>
    </div>
  );
}

const flowerInfo = {
  flower: {
    subjectId: 1,
    subjectName: "거베라",
    subjectLanguage: "신비, 수수께끼",
  },
  kinds: {
    kindId: 1,
    kindName: "미니",
    kindImage:
      "https://images.unsplash.com/photo-1588140096821-99ffc14c4bc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
};

const tabContArr = [
  { category: "가족" },
  { category: "연인" },
  { category: "친구" },
  { category: "선생님" },
  { category: "직장동료" },
  { category: "기타" },
];

export default FlowerDetail;
