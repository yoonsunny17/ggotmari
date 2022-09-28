import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProfileCollection from "../../../components/organisms/profile/ProfileCollection";
import ProfileInfo from "../../../components/organisms/profile/ProfileInfo";
import ProfileNavBar from "../../../components/organisms/profile/ProfileNavBar";
import { getUser } from "../../../api/profile.js";

export default function Collection() {
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
      userBirthday: "",
      userSex: "",
      isFollow: "",
    },
    articles: [
      {
        articleId: "",
        articleTitle: "",
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
        articleTitle: "",
        userName: "",
        likes: "",
      },
    ],
  });

  // 서버 통신 짤 코드

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
      const username = window.location.pathname.substring(20);
      getInfo(username);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="profile">
      <ProfileInfo userInfo={userInfo} setUserInfo={setUserInfo} />{" "}
      <ProfileNavBar />
      {/* 하단 */}
      <ProfileCollection likeFlowers={userInfo.likeFlowers} />
    </div>
  );
}
