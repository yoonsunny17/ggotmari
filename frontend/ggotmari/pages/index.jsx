import Router from "next/router";
import Link from "next/link";

import Header from "../components/atoms/common/Header";
import SearchBar from "../components/atoms/common/SearchBar";
import CommunityCard from "../components/atoms/index/CommunityCard";
import RecommItem from "../components/molecules/main/RecommItem";
import ArticleItem from "../components/molecules/community/ArticleItem";
import SpecialDayRecomm from "../components/organisms/main/SpecialDayRecomm";

import { BsPeople } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

function Home() {
  const username = "sangchuman";

  return (
    <div className="flex flex-col">
      <Header text={"꽃마리"} />
      <div className="font-sans flex justify-center mb-4">
        <SearchBar placeholder={"꽃 찾기"} />
      </div>
      <hr />
      <div className="flex flex-col items-center w-screen px-6">
        <div className="flex flex-col my-6 w-full">
          {/* 오늘의 꽃 버튼 */}

          <div
            onClick={() => Router.push("/flower/daily")}
            className="cursor-pointer flex justify-center mb-3"
          >
            <div className="rounded-md w-full h-32 overflow-hidden">
              <img
                className="w-full h-full brightness-90 object-cover"
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              />
              <div className="-translate-y-9 text-end mr-4 font-maru text-lg text-font3">
                <p>오늘의 꽃</p>
              </div>
            </div>
          </div>

          {/* 꽃 이야기 버튼 & 꽃에 담은 편지 버튼 */}
          <div className="flex justify-center">
            {/* 꽃 이야기 버튼 */}
            <button
              onClick={() => Router.push("/community")}
              className="w-1/2 h-12 rounded-md font-maru text-xs text-white bg-sub2 mr-3"
            >
              <div className="flex justify-between">
                <p className="ml-3 pt-1">
                  <BsPeople size={25} />
                </p>
                <p className="px-2 pt-4">꽃 이야기</p>
              </div>
            </button>
            {/* 꽃에 담은 편지 버튼 */}
            <button
              onClick={() => Router.push("/ocr")}
              className="w-1/2 h-12 rounded-md font-maru text-xs text-white bg-sub1"
            >
              <div className="flex justify-between">
                <p className="ml-3 pt-1">
                  <FaRegPaperPlane size={22} />
                </p>
                <p className="pr-2 pt-4">꽃에 담은 편지</p>
              </div>
            </button>
          </div>
        </div>
        <hr />

        {/* 추천 이야기 */}
        <div className="mt-3 font-sans mb-4">
          <div className="mb-3">
            <div>{username} 님을 위한 추천 이야기</div>
            <div className="text-xs">요즘 이런 꽃 좋아하시더라구요 :)</div>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-3">
            {recommPost.map((info, idx) => {
              return <CommunityCard info={info} key={idx} />;
            })}
          </div>
        </div>
        <hr />
        {/* 인기 이야기 TOP10 */}
        <div className="font-sans mt-6 w-full">
          <div className="mb-3">
            <div className="flex justify-between">
              <p>인기 이야기 TOP10</p>
              <Link href="/community/popular">
                <a>
                  <p className="flex items-center cursor-pointer">
                    <IoIosArrowForward />
                  </p>
                </a>
              </Link>
            </div>
            <div className="carousel w-full">
              {articles.map((article, idx) => {
                return (
                  <div
                    className="carousel-item relative w-full px-0.5"
                    key={idx}
                  >
                    <ArticleItem article={article} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <hr />
        <div className="font-sans mt-3 mb-14 w-full">
          <p className="mb-3">특별한 날 선물하기 좋은 꽃</p>
          <SpecialDayRecomm />
        </div>
      </div>
    </div>
  );
}

const recommPost = [
  {
    articleId: 100,
    username: "sangchuman",
    imgUrl:
      "https://images.unsplash.com/photo-1496483648148-47c686dc86a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    likeNumbs: 13,
  },
  {
    articleId: 101,

    username: "hot_bubbletea",
    imgUrl:
      "https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    likeNumbs: 32,
  },
  {
    articleId: 102,

    username: "princess_yo",
    imgUrl:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    likeNumbs: 6,
  },
  {
    articleId: 103,

    username: "sleepy_ssuny",
    imgUrl:
      "https://images.unsplash.com/photo-1510894399130-57dfa8dcc45d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1083&q=80",
    likeNumbs: 123,
  },
];

const articles = [
  {
    articleId: 1,
    articleImage:
      "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/00bf16c0-06d3-4a01-82f0-9f882d3333f5_%EC%8A%A4%ED%8F%B0%EC%A7%80%EB%B0%A5%EB%B0%A5.jpg",
    userId: "sangchuman",
    articleTitle: "여자친구한테 칭찬 받았어요",
    articleContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat vel quam ...",
    articleDate: "2022.09.07 14:04",
    tags: ["거베라", "장미"],
    commentCount: 5,
    likeCount: 15,
  },
  {
    articleId: 2,
    articleImage:
      "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/005a177b-e5f0-403d-bf7b-20da2560d54a_%EA%BC%AC%EB%B6%80%EA%B8%B0.png",
    userId: "hotbubbletea",
    articleTitle: "자기야 결혼하자",
    articleContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat vel quam ...",
    articleDate: "2022.09.07 14:04",
    tags: ["국화"],
    commentCount: 134,
    likeCount: 178,
  },
  {
    articleId: 3,
    articleImage:
      "https://images.unsplash.com/photo-1578863950596-a74dfe8267b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
    userId: "hotbubbletea",
    articleTitle: "꽃들고 피크닉 다녀왔어요",
    articleContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat vel quam ...",
    articleDate: "2022.09.07 14:04",
    tags: ["장미", "수국"],
    commentCount: 11,
    likeCount: 178,
  },
  {
    articleId: 4,
    articleImage:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    userId: "hotbubbletea",
    articleTitle: "나만의 꽃다발",
    articleContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat vel quam ...",
    articleDate: "2022.09.07 14:04",
    tags: ["장미"],
    commentCount: 134,
    likeCount: 50,
  },
];

export default Home;
