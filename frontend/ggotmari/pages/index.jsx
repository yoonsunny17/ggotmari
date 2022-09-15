import Header from "../components/atoms/common/Header";
import SearchBar from "../components/atoms/common/SearchBar";
import CommunityCard from "../components/atoms/index/CommunityCard";
import { BsPeople } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { info } from "daisyui/src/colors";

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
        <div className="mt-6 font-sans">
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
      </div>

      <div></div>
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

export default Home;
