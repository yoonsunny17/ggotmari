import FlowerCard from "../../atoms/index/FlowerCard";

// TODO: 가족 연인 직장동료 친구 선생님 기타
// TODO: 다른 상품 추천하기 버튼 (pagination)

function SpecialDayRecomm() {
  return (
    <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
      {recommFlowers.map((info, idx) => {
        return <FlowerCard info={info} key={idx} />;
      })}
    </div>
  );
}

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
];

export default SpecialDayRecomm;
