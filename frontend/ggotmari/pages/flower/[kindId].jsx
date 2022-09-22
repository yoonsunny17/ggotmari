import { useState, useEffect } from "react";
import RelatedPosts from "../../components/molecules/flower/RelatedPosts";
import SimilarFlowers from "../../components/molecules/flower/SimilarFlowers";

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
    <div className="mb-10">
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
          <div className="font-gangwon text-lg pt-4 pb-2">컬렉션에 담기</div>
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
        <div>
          <div className="font-gangwon text-lg pt-4 pb-2">
            {flowerInfo.flower.subjectName}의 다른 품종
          </div>

          <div className="carousel w-full">
            {similarFlowerArr.map((info, idx) => {
              return (
                <div
                  className="carousel-item relative w-1/4 h-fit px-1"
                  key={idx}
                >
                  <SimilarFlowers info={info} key={idx} />
                </div>
              );
            })}
          </div>
        </div>

        {/* 연관 게시물 보기 */}
        <div>
          <div className="font-gangwon text-lg py-4">
            {flowerInfo.flower.subjectName}를 담은 이야기
          </div>

          <div className="grid grid-cols-3 gap-x-3">
            {relatedPostArr.map((info, idx) => {
              return <RelatedPosts info={info} key={idx} />;
            })}
          </div>
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

const similarFlowerArr = [
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1001,
    kindName: "파스타",
    imgUrl:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MTFfMTQ4%2FMDAxNjMxMzUwMTk0OTY1.6CrWXrJpavTs3WsPTKBTkBesb8vITwgHyv3lL9NjtL0g.IP5CAh5L3sU4hEcD7qrunu1ZMyUJHJ8LYn7GvzI0eIcg.JPEG.flowerity_by%2Foutput_3853465575.jpg&type=sc960_832",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1002,
    kindName: "스파이더",
    imgUrl:
      "https://t3.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/cDjc/image/FLxszoCosErrwla-YBE8KcfLlms.png",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1003,
    kindName: "폼포니",
    imgUrl:
      "https://static.okkot.com/images/w_600/%E1%84%91%E1%85%A9%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%B5%20%E1%84%80%E1%85%A5%E1%84%87%E1%85%A6%E1%84%85%E1%85%A1%20%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%B5-1621589021176-a2ee868f-6e16-4fa0-a474-473a7ae096b7.jpg",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1004,
    kindName: "파스타",
    imgUrl:
      "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1005,
    kindName: "스파이더",
    imgUrl:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1006,
    kindName: "폼포니",
    imgUrl:
      "https://images.unsplash.com/photo-1611086615542-635f48ae4656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1007,
    kindName: "파스타",
    imgUrl:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MTFfMTQ4%2FMDAxNjMxMzUwMTk0OTY1.6CrWXrJpavTs3WsPTKBTkBesb8vITwgHyv3lL9NjtL0g.IP5CAh5L3sU4hEcD7qrunu1ZMyUJHJ8LYn7GvzI0eIcg.JPEG.flowerity_by%2Foutput_3853465575.jpg&type=sc960_832",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1008,
    kindName: "스파이더",
    imgUrl:
      "https://t3.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/cDjc/image/FLxszoCosErrwla-YBE8KcfLlms.png",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1009,
    kindName: "폼포니",
    imgUrl:
      "https://static.okkot.com/images/w_600/%E1%84%91%E1%85%A9%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%B5%20%E1%84%80%E1%85%A5%E1%84%87%E1%85%A6%E1%84%85%E1%85%A1%20%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%B5-1621589021176-a2ee868f-6e16-4fa0-a474-473a7ae096b7.jpg",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1010,
    kindName: "파스타",
    imgUrl:
      "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1011,
    kindName: "스파이더",
    imgUrl:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1012,
    kindName: "폼포니",
    imgUrl:
      "https://images.unsplash.com/photo-1611086615542-635f48ae4656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1013,
    kindName: "미니",
    imgUrl:
      "https://images.unsplash.com/photo-1588140096821-99ffc14c4bc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
];

const relatedPostArr = [
  {
    articleId: 1111,
    articleImage:
      "https://images.unsplash.com/photo-1496483648148-47c686dc86a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    likeCount: 23,
    username: "yoonsunny",
  },
  {
    articleId: 1112,
    articleImage:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    likeCount: 288,
    username: "flower_mania",
  },
  {
    articleId: 1113,
    articleImage:
      "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/00bf16c0-06d3-4a01-82f0-9f882d3333f5_%EC%8A%A4%ED%8F%B0%EC%A7%80%EB%B0%A5%EB%B0%A5.jpg",
    likeCount: 59,
    username: "sangchuman",
  },
  {
    articleId: 1114,
    articleImage:
      "https://images.unsplash.com/photo-1510894399130-57dfa8dcc45d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1083&q=80",
    likeCount: 100,
    username: "ggotmari_jjang",
  },
  {
    articleId: 1111,
    articleImage:
      "https://images.unsplash.com/photo-1496483648148-47c686dc86a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    likeCount: 23,
    username: "yoonsunny",
  },
  {
    articleId: 1112,
    articleImage:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    likeCount: 288,
    username: "flower_mania",
  },
  {
    articleId: 1113,
    articleImage:
      "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/00bf16c0-06d3-4a01-82f0-9f882d3333f5_%EC%8A%A4%ED%8F%B0%EC%A7%80%EB%B0%A5%EB%B0%A5.jpg",
    likeCount: 59,
    username: "sangchuman",
  },
  {
    articleId: 1114,
    articleImage:
      "https://images.unsplash.com/photo-1510894399130-57dfa8dcc45d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1083&q=80",
    likeCount: 100,
    username: "ggotmari_jjang",
  },
  {
    articleId: 1111,
    articleImage:
      "https://images.unsplash.com/photo-1496483648148-47c686dc86a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    likeCount: 23,
    username: "yoonsunny",
  },
  {
    articleId: 1112,
    articleImage:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    likeCount: 288,
    username: "flower_mania",
  },
  {
    articleId: 1113,
    articleImage:
      "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/00bf16c0-06d3-4a01-82f0-9f882d3333f5_%EC%8A%A4%ED%8F%B0%EC%A7%80%EB%B0%A5%EB%B0%A5.jpg",
    likeCount: 59,
    username: "sangchuman",
  },
  {
    articleId: 1114,
    articleImage:
      "https://images.unsplash.com/photo-1510894399130-57dfa8dcc45d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1083&q=80",
    likeCount: 100,
    username: "ggotmari_jjang",
  },
];

const tabContArr = [
  { category: "가족" },
  { category: "연인" },
  { category: "친구" },
  { category: "선생님" },
  { category: "직장동료" },
  { category: "기타" },
];

export default FlowerDetail;
