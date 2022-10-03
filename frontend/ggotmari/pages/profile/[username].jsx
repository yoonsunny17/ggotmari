import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

import { getUser } from "../../api/profile.js";

import ProfileInfo from "../../components/organisms/profile/ProfileInfo";
import ProfileNavBar from "../../components/organisms/profile/ProfileNavBar";

import StoryImage from "../../components/atoms/profile/StoryImage";
import ProfileCollection from "../../components/organisms/profile/ProfileCollection";
import LikeImage from "../../components/atoms/profile/LikeImage";

import noStory from "../../assets/profile/main/noStoryImg.jpg";
import noLikeStory from "../../assets/profile/like/noLikeStoryImg.jpg";
import noFlower from "../../assets/profile/collection/noFlowerImg.jpg";

export default function Profile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    status: "",
    message: "",
    isMe: "",
    user: {
      userName: "",
      followingCount: "",
      followerCount: "",
      userImage: noFlower.src,
      userBirthday: "",
      userSex: "",
      isFollow: "",
    },
    articles: [
      {
        articleId: "",
        articleTitle: "",
        articleImage: noStory.src,
      },
    ],
    likeFlowers: [
      {
        tag: "",
        flowers: [
          {
            flowerImage: noFlower.src,
            subjectId: "",
            kindId: "",
            kindName: "",
          },
        ],
      },
    ],
    likeArticles: [
      {
        articleId: "",
        articleImage: noLikeStory.src,
        articleTitle: "",
        userName: "",
        likes: "",
      },
    ],
  });
  const [activeTab, setActiveTab] = useState(0);

  const onActiveTab = (index) => {
    setActiveTab(index);
  };

  // 초기 데이터 받아오기
  const getUserSuccess = (res) => {
    setUserInfo(res.data);
  };

  const getUserFail = (err) => {
    console.log(err);
    router.push("/404");
  };

  const getInfo = (username) => {
    getUser(username, getUserSuccess, getUserFail);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const username = window.location.pathname.substring(9);
      getInfo(username);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div className="profile">
        <ProfileInfo userInfo={userInfo} setUserInfo={setUserInfo} />
        <ProfileNavBar activeTab={activeTab} onActiveTab={onActiveTab} />
        {/* 하단 */}
      </div>
      {activeTab === 0 && (
        <div
          className={"content grid grid-cols-3 mt-3 mb-14 gap-x-2 gap-y-2 mx-3"}
        >
          {userInfo.articles.length > 0 ? (
            userInfo.articles.map((item, index) => {
              return (
                <StoryImage
                  key={index}
                  url={item.articleImage}
                  title={item.articleTitle}
                  id={item.articleId}
                />
              );
            })
          ) : (
            <div className="col-span-3 flex justify-center mx-10">
              <div className="content-box w-full">
                <div className="img-box-1 my-10 w-full relative">
                  <div className="img-box-2 aspect-square flex justify-center">
                    <Image
                      src={noStory.src}
                      alt="조회할 꽃 이야기가 없음"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  {/* <img
                    src={noStory.src}
                    alt="조회할 꽃이 없음"
                    className="w-2/3"
                  /> */}
                </div>
                <div className="text-box flex justify-center font-gangwon text-font4">
                  <span>작성한 꽃 이야기가 없습니다</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === 1 && (
        <ProfileCollection likeFlowers={userInfo.likeFlowers} />
      )}
      {activeTab === 2 && (
        <div className="content grid grid-cols-3 mt-3 mb-14  mx-3">
          {userInfo.likeArticles.length > 0 ? (
            userInfo.likeArticles.map((item, index) => {
              return (
                <LikeImage
                  key={index}
                  articleId={item.articleId}
                  articleImage={item.articleImage}
                  userName={item.userName}
                  likes={item.likes}
                  articleTitle={item.articleTitle}
                />
              );
            })
          ) : (
            <div className="col-span-3 flex justify-center mx-10">
              <div className="content-box w-full">
                <div className="img-box-1 my-10 w-full relative">
                  <div className="img-box-2 aspect-square flex justify-center">
                    <Image
                      src={noLikeStory.src}
                      alt="조회할 꽃 이야기가 없음"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  {/* <img
                    src={noLikeStory.src}
                    alt="조회할 꽃 이야기가 없음"
                    className="w-2/3"
                  /> */}
                </div>
                <div className="text-box flex justify-center font-gangwon text-font4">
                  <span>좋아요를 누른 꽃 이야기가 없습니다</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
