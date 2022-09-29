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

  // 초기 데이터 받아오기
  const getUserSuccess = (res) => {
    setUserInfo(res.data);
  };

  const getUserFail = (err) => console.log(err);

  const getInfo = (username) => {
    getUser(username, getUserSuccess, getUserFail);
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
