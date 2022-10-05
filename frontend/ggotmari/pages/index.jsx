import Router from "next/router";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import Header from "../components/atoms/common/Header";
import CommunityCard from "../components/atoms/index/CommunityCard";
import ArticleItem from "../components/molecules/community/ArticleItem";
import SpecialDayRecomm from "../components/organisms/main/SpecialDayRecomm";

import { getPopularList } from "../api/community";
import { getArticleRecomm } from "../api/recommend";
import { getUserName } from "../api/user";

import { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoFlowerOutline } from "react-icons/io5";

import kakao_channel from "../assets/id_type.png";

function Home() {
  const router = useRouter();
  const [popularPosts, setPopularPosts] = useState([]);
  const [recommArticles, setRecommArticles] = useState([]);

  // 유저 정보 받아오기
  const [username, setUsername] = useState("");

  const success = (res) => {
    setUsername(res.data.userName);
    console.log(res);
  };
  const fail = (err) => console.log(err);

  const getInfo = async () => {
    await getUserName(success, fail);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getInfo();
      getArticleRecomm(
        (res) => {
          // console.log(res.data);
          setRecommArticles(res.data.articles);
        },
        (err) => {
          console.log(err);
        }
      );
    }

    getPopularList(
      (res) => {
        setPopularPosts(res.data.articles);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  // console.log(username);

  return (
    <div className="flex flex-col w-screen">
      <Head>
        <title>Home | GGOTMARI</title>
        <meta property="og:title" content="Home" key="Home" />
        <meta name="description" content="Home" />
      </Head>
      <Header text={"꽃마리"} />
      <hr />
      <div className="flex flex-col items-center w-screen px-6 divide-y divide-sub1 divide-opacity-60">
        {/* 오늘의 꽃, 꽃 이야기, 꽃에 담은 편지 */}
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
              <div className="-translate-y-9 text-end mr-3 font-gangwon text-xl text-font3">
                <p>오늘의 꽃</p>
              </div>
            </div>
          </div>

          {/* 꽃에 담은 편지 버튼, 꽃 사전 버튼, 꽃 이야기 버튼 */}
          <div className="grid grid-rows-1 grid-flow-col grid-cols-2">
            <div className="">
              {/* 꽃에 담은 편지 버튼 */}
              <button
                onClick={() => Router.push("/recommend")}
                className="w-[calc(100%-12px)] h-12 rounded-md font-gangwonlight text-sm text-white bg-sub1 mr-3 mb-2"
              >
                <div className="flex justify-between">
                  <p className="ml-3 pt-[6px]">
                    <FaRegPaperPlane size={22} />
                  </p>
                  <p className="font-gangwon pr-2 pt-4">꽃에 담은 편지</p>
                </div>
              </button>

              {/* 꽃 사전 버튼 */}
              <button
                onClick={() => Router.push("/flower/search/")}
                className="w-[calc(100%-12px)] h-12 rounded-md font-gangwonlight text-sm text-white bg-extra2"
              >
                <div className="flex justify-between">
                  <p className="ml-3 pt-[6px]">
                    <IoFlowerOutline size={25} />
                    {/* <AiOutlineSearch size={25} /> */}
                  </p>
                  <p className="font-gangwon pr-2 pt-4">꽃 사전</p>
                </div>
              </button>
            </div>

            <div
              className="cursor-pointer"
              onClick={() => Router.push("/community")}
            >
              <img
                className="h-[106px] w-full object-cover rounded-md"
                src="https://images.unsplash.com/photo-1591783097488-bda7e4e8653e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=422&q=80"
                alt=""
              />
              <div className="relative">
                <div className="absolute bottom-1 right-3 first-line:font-gangwon text-white text-lg">
                  꽃 이야기
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 추천 이야기 */}
        <div className="pt-6 pb-3 font-sans mb-4 w-full">
          <div className="mb-3 text-font1 pb-1">
            <div>{username} 님을 위한 추천 이야기</div>
            <div className="text-xs">요즘 이런 꽃 좋아하시더라구요 :)</div>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-3">
            {recommArticles.map((info, idx) => {
              return <CommunityCard info={info} key={idx} />;
            })}
            {/* {recommPost.map((info, idx) => {
              return <CommunityCard info={info} key={idx} />;
            })} */}
          </div>
        </div>

        {/* 인기 이야기 TOP10 */}
        <div className="pt-6 font-sans w-full">
          <div className="mb-3">
            <div className="flex justify-between mb-3 text-font1">
              <p>인기 이야기 TOP10</p>
              <Link href="/community">
                <p className="flex cursor-pointer">
                  <IoIosArrowForward />
                </p>
              </Link>
              {/* <Link href="/community/popular">
                <a>
                  <p className="flex items-center cursor-pointer">
                    <IoIosArrowForward />
                  </p>
                </a>
              </Link> */}
            </div>
            <div className="carousel w-full">
              {popularPosts.map((article, idx) => {
                return (
                  <div
                    className="carousel-item relative w-full px-0.5 mb-2"
                    key={idx}
                  >
                    <ArticleItem article={article} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 특별한 날 선물하기 좋은 꽃 */}
        <div className="pt-6 font-sans w-full">
          <p className="mb-3 text-font1">특별한 날 선물하기 좋은 꽃</p>
          <SpecialDayRecomm />
        </div>

        {/* 도움을 원하시나요? */}
        <div className="mb-16 w-full font-sans pt-6">
          <div className="pb-4 text-font1">도움을 원하시나요?</div>
          <div className="flex justify-between text-sm text-font2">
            {/* <div className="text-sm text-font2 grid grid-cols gap-y-1"> */}
            <Link href="https://pf.kakao.com/_VKECxj">
              <a target="_blank">
                <img className="w-20" src={kakao_channel.src} alt="" />
              </a>
            </Link>
            <Link href="https://a303-princess.notion.site/690dcc0e597b4a7886754f98b493371d">
              {/* <a> */}
              <a target="_blank">
                <div className="flex">
                  <img
                    className="w-6"
                    src="https://img.icons8.com/offices/30/000000/flower.png"
                  />
                  <span className="flex items-end ml-1">
                    서비스 이용 가이드
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// const recommPost = [
//   {
//     articleId: 1,
//     username: "sangchuman",
//     articleImage:
//       "https://images.unsplash.com/photo-1496483648148-47c686dc86a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
//     likeCount: 13,
//   },
//   {
//     articleId: 2,

//     username: "hot_bubbletea",
//     articleImage:
//       "https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
//     likeCount: 32,
//   },
//   {
//     articleId: 3,

//     username: "princess_yo",
//     articleImage:
//       "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
//     likeCount: 6,
//   },
//   {
//     articleId: 4,

//     username: "sleepy_ssuny",
//     articleImage:
//       "https://images.unsplash.com/photo-1510894399130-57dfa8dcc45d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1083&q=80",
//     likeCount: 123,
//   },
// ];

export default Home;
