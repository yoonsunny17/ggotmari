import Header from "../../components/atoms/common/Header";

// TODO: 날짜에 맞는 꽃 정보 렌더링
function DailyFlower() {
  return (
    <div className="flex flex-col">
      <div>
        <Header text={"오늘의 꽃"} />
      </div>
      <img
        className="aspect-square object-cover"
        src="https://images.unsplash.com/photo-1527061011665-3652c757a4d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
        alt=""
      />
    </div>
  );
}

const DailyFlowers = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
  },
];
export default DailyFlower;
