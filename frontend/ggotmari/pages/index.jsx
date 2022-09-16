import Header from "../components/atoms/common/Header";
import SearchBar from "../components/atoms/common/SearchBar";
import CommunityCard from "../components/atoms/index/CommunityCard";
import ArticleItem from "../components/molecules/community/ArticleItem";
import { BsPeople } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import SpecialDayRecomm from "../components/organisms/index/SpecialDayRecomm";

function Home() {
  const username = "sangchuman";
  return (
    <div>
      <Header text={"꽃마리"} />
      <div className="font-sans flex justify-center mb-4">
        <SearchBar placeholder={"꽃 찾기"} />
      </div>
      <hr />
      <div className="container mx-auto px-[30px]">
        <div className="my-6">
          {/* 오늘의 꽃 버튼 */}
          <div className="cursor-pointer flex justify-center mb-3">
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
          <div className="flex justify-center mx-auto">
            {/* 꽃 이야기 버튼 */}
            {/* <button className="h-12 w-36 rounded-md font-maru text-sm text-font3 bg-sub2 mr-3"> */}
            <button className="w-1/2 h-12 rounded-md font-maru text-xs text-font3 bg-sub2 mr-3">
              <div className="flex justify-between">
                <p className="ml-3 pt-1">
                  <BsPeople size={25} />
                </p>
                <p className="px-2 pt-4">꽃 이야기</p>
              </div>
            </button>
            {/* 꽃에 담은 편지 버튼 */}
            <button className="w-1/2 h-12 rounded-md font-maru text-xs text-font3 bg-sub1">
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
        <div className="mt-6 font-sans mb-4">
          <div className="mb-3">
            <div>{username} 님을 위한 추천 이야기</div>
            <div className="text-xs">요즘 이런 꽃다발 좋아하시더라구요 :)</div>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-3">
            {recommPost.map((info, idx) => {
              return <CommunityCard info={info} key={idx} />;
            })}
          </div>
        </div>
        <hr />
        {/* 인기 이야기 TOP10 */}
        <div className="font-sans mt-6">
          <div className="mb-3">
            <div className="flex justify-between">
              <p>인기 이야기 TOP10</p>
              <p className="flex items-center">
                <IoIosArrowForward />
              </p>
            </div>
            {/* carousel component 고칠 것!! */}
            <div className="carousel">
              <div className="carousel-item">
                {articles.map((article) => (
                  <ArticleItem article={article} key={article.articleId} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="font-sans mt-6 mb-3">
          <p className="mb-3">특별한 날 선물하기 좋은 꽃</p>
          <SpecialDayRecomm />
        </div>
      </div>
    </div>
  );
}

const recommPost = [
  {
    username: "sangchuman",
    imgUrl:
      "https://images.unsplash.com/photo-1496483648148-47c686dc86a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    likeNumbs: 13,
  },
  {
    username: "hot_bubbletea",
    imgUrl:
      "https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    likeNumbs: 32,
  },
  {
    username: "princess_yo",
    imgUrl:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    likeNumbs: 6,
  },
  {
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
];

export default Home;
