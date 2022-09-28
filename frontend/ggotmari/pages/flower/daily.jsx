import Header from "../../components/atoms/common/Header";
import DailyFlowerDetail from "../../components/organisms/flower/DailyFlowerDetail";

// TODO: 날짜에 맞는 꽃 정보 렌더링
function DailyFlower() {
  return (
    <div className="flex flex-col">
      <div>
        <Header text={"오늘의 꽃"} />
      </div>
      <DailyFlowerDetail />
      {/* {DailyFlowers.map((info, idx) => {
        return <DailyFlowerDetail info={info} key={idx} />;
      })} */}
    </div>
  );
}

const DailyFlowers = [
  {
    flowerName: "전나무",
    flowerLanguage: "고상함",
    flowerLuck:
      "깨끗한 생애를 살 사람입니다. 노력을 게을리 하면 남들과 거의 비슷하게 되므로 유의해야겠군요.",
    imgUrl: "https://t1.daumcdn.net/cfile/tistory/247AC13B55F3944806",
  },
];
export default DailyFlower;
