import { useState } from "react";
import FlowerCard from "../../atoms/index/FlowerCard";
import CollectionBtn from "../../atoms/profile/CollectionBtn";

// TODO: 가족 연인 직장동료 친구 선생님 기타
// TODO: 다른 상품 추천하기 버튼 (pagination)

function SpecialDayRecomm() {
  // TODO: tab index button
  const [activeIndex, setActiveIndex] = useState(0);
  const tabClickHandler = (index) => {
    setActiveIndex(index);
    console.log(`${index}`);
  };

  return (
    <div>
      <div className="grid grid-cols-6 mb-3">
        {tabContArr.map(({ category }, idx) => (
          <div key={category} className="col-span-1 px-1">
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
      {/* Content */}
      <div className="">
        {/* 가족 */}
        {activeIndex === 0 && (
          <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
            {recommFlowers.map((info, idx) => {
              return <FlowerCard info={info} key={idx} />;
            })}
          </div>
        )}
        {/* 연인 */}
        {activeIndex === 1 && (
          <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
            {recommFlowers.map((info, idx) => {
              return <FlowerCard info={info} key={idx} />;
            })}
          </div>
        )}
        {activeIndex === 2 && (
          <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
            {recommFlowers.map((info, idx) => {
              return <FlowerCard info={info} key={idx} />;
            })}
          </div>
        )}
        {activeIndex === 3 && (
          <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
            {recommFlowers.map((info, idx) => {
              return <FlowerCard info={info} key={idx} />;
            })}
          </div>
        )}
        {activeIndex === 4 && (
          <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
            {recommFlowers.map((info, idx) => {
              return <FlowerCard info={info} key={idx} />;
            })}
          </div>
        )}
        {activeIndex === 5 && (
          <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
            {recommFlowers.map((info, idx) => {
              return <FlowerCard info={info} key={idx} />;
            })}
          </div>
        )}
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

const recommFlowers = [
  {
    flowerName: "분홍장미",
    imgUrl:
      "https://images.unsplash.com/photo-1597826368522-9f4cb5a6ba48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80",
  },
  {
    flowerName: "진한분홍장미",
    imgUrl:
      "https://images.unsplash.com/photo-1531874824027-2a0d33bd6338?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    flowerName: "해바라기",
    imgUrl:
      "https://images.unsplash.com/photo-1593026238161-ac5f86e5ef79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    flowerName: "하얀장미",
    imgUrl:
      "https://images.unsplash.com/photo-1495231916356-a86217efff12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
  },
  {
    flowerName: "하얀 벚꽃",
    imgUrl:
      "https://images.unsplash.com/photo-1615280825886-fa817c0a06cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    flowerName: "백합",
    imgUrl:
      "https://images.unsplash.com/photo-1532009871151-e1958667c80d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    flowerName: "튤립",
    imgUrl:
      "https://images.unsplash.com/photo-1519218470957-62c7c83c36b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80",
  },
  {
    flowerName: "보라색꽃",
    imgUrl:
      "https://images.unsplash.com/photo-1607194467295-8ca6d873e5fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    flowerName: "데이지",
    imgUrl:
      "https://images.unsplash.com/photo-1532211700417-31f06f3e27d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    flowerName: "분홍꽃",
    imgUrl:
      "https://images.unsplash.com/photo-1523224042829-4731dd15a3bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
  },
  {
    flowerName: "진분홍꽃",
    imgUrl:
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    flowerName: "핑크튤립",
    imgUrl:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
  },
  {
    flowerName: "파란색꽃",
    imgUrl:
      "https://images.unsplash.com/photo-1556647944-11bc0d4e0c4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
  },
  {
    flowerName: "노란꽃",
    imgUrl:
      "https://images.unsplash.com/photo-1601126374163-29f78d5e6d9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=852&q=80",
  },
  {
    flowerName: "체리블로썸",
    imgUrl:
      "https://images.unsplash.com/photo-1491866766009-1292fd127204?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    flowerName: "주황색꽃",
    imgUrl:
      "https://images.unsplash.com/photo-1528907298109-e64971adc8e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    flowerName: "이쁜꽃",
    imgUrl:
      "https://images.unsplash.com/photo-1579900754584-0381d0a8b46d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=848&q=80",
  },
];

export default SpecialDayRecomm;
