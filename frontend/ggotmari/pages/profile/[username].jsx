import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StoryImage from "../../components/atoms/profile/StoryImage";
import ProfileInfo from "../../components/organisms/profile/ProfileInfo";
import ProfileNavBar from "../../components/organisms/profile/ProfileNavBar";
import { getUser } from "../../api/profile.js";
import noStory from "../../assets/profile/main/noStoryImg.jpg";

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
      userImage: "",
      isFollow: "",
    },
    articles: [
      {
        articleId: "",
        articleImage: "",
      },
    ],
    likeFlowers: [
      {
        tag: "",
        flowers: [
          {
            flowerImage: "",
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
        articleImage: "",
        userName: "",
        likes: "",
      },
    ],
  });

  const success = (res) => {
    setUserInfo(res.data);
  };
  const fail = (err) => console.log(err);
  // 서버 통신 짤 코드

  const getInfo = (username) => {
    // console.log(username);
    getUser(username, success, fail);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const username = window.location.pathname.substring(9);
      getInfo(username);
    } else {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div className="profile">
        <ProfileInfo user={userInfo.user} isMe={userInfo.isMe} />
        <ProfileNavBar />
        {/* 하단 */}
      </div>
      <div className="content grid grid-cols-3 mt-3 mb-14">
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
          <div className="col-span-3 flex justify-center">
            <div className="content-box w-full">
              <div className="img-box flex justify-center my-10">
                <img
                  src={noStory.src}
                  alt="조회할 꽃이 없음"
                  className="w-2/3"
                />
              </div>
              <div className="text-box flex justify-center font-gangwon text-font4">
                <span>작성한 꽃 이야기가 없습니다</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
