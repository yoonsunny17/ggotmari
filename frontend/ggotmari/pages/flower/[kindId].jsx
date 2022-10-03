import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

import { getFlowerDetail, postFlowerDetail } from "../../api/flower";
import { postDislikeRecomm } from "../../api/recommend";

import RelatedPosts from "../../components/molecules/flower/RelatedPosts";
import SimilarFlowers from "../../components/molecules/flower/SimilarFlowers";

function FlowerDetail() {
  const router = useRouter();
  const [flowerInfo, setFlowerInfo] = useState({
    subjectId: "",
    subjectName: "",
    subjectLanguage: "",
    kindId: "",
    kindName: "",
    kindImage: "",
    kinds: [
      {
        kindId: "",
        kindName: "",
        kindImage: "",
        tags: [
          {
            tagId: "",
            tagName: "",
            tagStatus: "",
          },
        ],
      },
    ],

    articles: [
      {
        articleId: "",
        articleImage: "",
        userName: "",
        likeCount: "",
      },
    ],
  });

  const [duplicated, setDuplicated] = useState(["없음"]);
  useEffect(() => {
    if (duplicated.length === 7 || duplicated.length === 0) {
      setDuplicated(["없음"]);
    }
  }, [duplicated]);

  useEffect(() => {
    console.log(router.query.kindId);
    const path = window.location.pathname.substring(8);
    // const username = window.location.pathname.substring(20);
    getFlowerDetail(
      // router.query.subjectId,
      path,
      (res) => {
        // console.log(res);
        setFlowerInfo(res.data);
        // console.log("품종 정보");
        // console.log(res.data);
        // console.log(res.data.kindImage);
        // console.log(res)
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  console.log(flowerInfo);

  const handleDuplicated = (e) => {
    console.log(e);
    // console.log(e.target.innerText);
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
    console.log(duplicated);
  };

  return (
    <div className="mb-10 w-screen">
      {/* <img
        className="w-full aspect-square object-cover"
        src={flowerInfo.kindImage}
        alt="flower image"
      /> */}
      <Image
        src={flowerInfo.kindImage}
        alt={flowerInfo.kindName + ", " + flowerInfo.subjectName}
        layout="responsive"
        width={500}
        height={500}
        objectFit="cover"
        priority
      />
      <div className="px-6 pt-6 divide-y divide-sub1 divide-opacity-60">
        {/* 품종명, 품목명, 꽃말 */}
        <div>
          <div className="font-gangwon text-2xl font-medium mb-4">
            {/* 품종명, 품목명 */}
            {flowerInfo.kindName}, {flowerInfo.subjectName}
          </div>
          {/* 꽃말 */}
          <div className="font-sanslight text-font2 text-sm mb-5">
            {flowerInfo.subjectName}의 꽃말은 {/* 꽃말 부분만 bold 강조 */}
            <span className="font-bold">{flowerInfo.subjectLanguage}</span>{" "}
            입니다
          </div>
        </div>

        {/* 컬렉션에 담기 */}
        <div>
          <div className="font-gangwon text-lg pt-4 pb-3">컬렉션에 담기</div>
          <div className="grid grid-cols-6 mb-5">
            {tabContArr.map(({ category }, idx) => {
              if (idx >= 1) {
                return (
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
                );
              }
            })}
          </div>
        </div>

        {/* 다른 품종 보기 */}
        <div>
          <div className="font-gangwon text-lg pt-4 pb-4">
            {flowerInfo.subjectName}의 다른 품종
          </div>

          <div className="carousel w-full">
            {flowerInfo.kinds.map((info, idx) => {
              return (
                <div className="carousel-item w-1/4 px-1" key={idx}>
                  <SimilarFlowers info={info} key={idx} />
                </div>
              );
            })}
          </div>
        </div>

        {/* 연관 게시물 보기 */}
        <div className="mb-16">
          <div className="font-gangwon text-lg pb-3 pt-4">
            {flowerInfo.subjectName}를 담은 이야기
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-2.5">
            {flowerInfo.articles.map((info, idx) => {
              return <RelatedPosts info={info} key={idx} />;
            })}
            {/* {relatedPostArr.map((info, idx) => {
              return <RelatedPosts info={info} key={idx} />;
            })} */}
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
      "https://images.unsplash.com/photo-1646928111250-2b2252682c3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1002,
    kindName: "스파이더",
    imgUrl:
      "https://images.unsplash.com/photo-1566228965180-0b4e14f6fcb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1003,
    kindName: "폼포니",
    imgUrl:
      "https://images.unsplash.com/photo-1642775588061-5743b12a47c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1004,
    kindName: "파스타",
    imgUrl:
      "https://images.unsplash.com/photo-1646928111250-2b2252682c3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
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
      "https://images.unsplash.com/photo-1646928111250-2b2252682c3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1008,
    kindName: "스파이더",
    imgUrl:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1009,
    kindName: "폼포니",
    imgUrl:
      "https://images.unsplash.com/photo-1642775588061-5743b12a47c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
  {
    subjectId: 1,
    subjectName: "거베라",
    kindId: 1010,
    kindName: "파스타",
    imgUrl:
      "https://images.unsplash.com/photo-1646928111250-2b2252682c3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
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
  { category: "전체" },
  { category: "가족" },
  { category: "연인" },
  { category: "직장동료" },
  { category: "친구" },
  { category: "선생님" },
  { category: "기타" },
];

export default FlowerDetail;
