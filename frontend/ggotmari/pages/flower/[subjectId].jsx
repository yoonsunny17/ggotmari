import { useRouter } from "next/router";

function FlowerDetail(params) {
  const router = useRouter();

  return (
    <div>
      <img
        className="w-full aspect-square object-cover"
        src={flowerInfo.kinds.kindImage}
        alt="flower image"
      />
      <div className="px-6 pt-6">
        <div className="font-gangwon text-2xl font-medium mb-1">
          {/* 품종명, 품목명 */}
          {flowerInfo.kinds.kindName}, {flowerInfo.flower.subjectName}
        </div>
        <div className="font-sans text-font2 mb-4">
          {/* 꽃말 */}
          {flowerInfo.flower.subjectName}의 꽃말은 {/* 꽃말 부분만 bold 강조 */}
          <span className="font-bold">
            {flowerInfo.flower.subjectLanguage}
          </span>{" "}
          입니다
        </div>
        <hr />
        <div className="font-gangwon text-lg mt-4">컬렉션에 담기</div>
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

export default FlowerDetail;
