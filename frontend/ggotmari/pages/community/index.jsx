import ArticleItem from "../../components/molecules/community/ArticleItem";
import SearchBar from "../../components/atoms/common/SearchBar";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Community() {
  const [tab, setTab] = useState("전체");
  const tabs = ["전체", "팔로잉", "인기글"];

  const handleTabClick = (e) => {
    setTab(e.target.innerHTML);
  };

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
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mb-6">
        <div className="font-maru text-main text-xl font-semibold my-5">
          우리들의 꽃 이야기
        </div>
        <SearchBar placeholder={"꽃 이야기 찾기"} />
      </div>
      <div className="flex flex-row border-b-2 border-font3">
        {tabs.map((tabName) => (
          <div
            className={`text-black text-xs font-sans px-5 py-3 ${
              tab === tabName ? "font-bold border-b-2 border-main" : ""
            }`}
            key={tabName}
            onClick={(e) => handleTabClick(e)}
          >
            {tabName}
          </div>
        ))}
      </div>
      <div className="p-4">
        {articles.map((article) => (
          <ArticleItem article={article} key={article.articleId} />
        ))}
      </div>
      <div className="fixed bottom-20 right-5 rounded-full w-12 aspect-square bg-sub1 shadow-lg flex justify-center items-center hover:scale-110 hover:bg-main duration-200">
        <FaPlus className="text-white text-2xl" />
      </div>
    </div>
  );
}
