import YJ from "../../../assets/YJ.png";
import { BsCamera } from "react-icons/bs";
import { IoRefreshOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUser } from "../../../api/profile.js";

function Edit() {
  const router = useRouter();

  // user 정보 받아온 뒤
  // 라우터와 유저네임 비교 후
  // 다르면 잘못된 접근입니다. alert 띄우고
  // home으로 보내기

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState([]);
  const [userImagePreview, setUserImagePreview] = useState(
    "https://ggotmari.s3.ap-northeast-2.amazonaws.com/profile/defualt.jpg"
  );
  const [userSex, setUserSex] = useState(false);
  const [userBirthday, setUserBirthday] = useState(null);
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
    console.log(res.data);
    setUserInfo(res.data);
    setUserName(res.data.user.userName);
    setUserImagePreview(res.data.user.userImage);
    setUserSex(res.data.user.userSex);
    setUserBirthday(res.data.user.userBirthday);
  };

  const fail = (err) => {
    console.log(err);
    alert("잘못된 접근입니다.");
    router.push("/");
  };
  // 서버 통신 짤 코드

  const getInfo = (username) => {
    // console.log(username);
    getUser(username, success, fail);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const username = window.location.pathname.substring(14);
      getInfo(username);
    } else {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login");
    }
  }, []);

  const changeuserImage = (event) => {
    setUserImage(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    setUserImagePreview(url);
  };

  const onUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const onUserBirthdayChange = (event) => {
    setUserBirthday(event.target.value);
  };

  const onUserSexChange = (event) => {
    setUserSex(event.target.value);
  };

  const resetUserImage = () => {
    setUserImage([]);
    setUserImagePreview(
      "https://ggotmari.s3.ap-northeast-2.amazonaws.com/profile/defualt.jpg"
    );
  };

  // 제출
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="title flex justify-center">
        <span className="my-8 font-maru text-2xl text-main">프로필 수정</span>
      </div>
      <form action="">
        <div className="profile-edit">
          <div className="image-box flex justify-center">
            <div className="w-2/5 aspect-square">
              <img
                src={userImagePreview}
                alt=""
                className="image w-full h-full rounded-full"
              />
            </div>
          </div>
          <div className="image-change flex justify-center items-center my-5 text-font1 font-sanslight mb-5">
            <label htmlFor="profile-pic">
              <span className="mr-2 text-sm flex items-center cursor-pointer">
                <BsCamera size={20} className="mr-2" />
                사진변경
              </span>
            </label>
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              onChange={changeuserImage}
              className="w-0"
            />
            <span className="text-xl">|</span>
            <span
              className="ml-2 text-sm flex items-center cursor-pointer"
              onClick={resetUserImage}
            >
              <IoRefreshOutline size={20} className="mr-1" />
              초기화
            </span>
          </div>
          <div className="info-box mx-10  border-t-sub1 border-t-[1px] text-md">
            <div className="id-box border-b-sub1 border-b-[0.5px] py-5 text-font1 font-sanslight ">
              <div className="grid grid-cols-3 mx-3">
                <div className="category col-span-1 flex items-center">
                  <span>아이디</span>
                </div>
                <div className="input-box col-span-2">
                  <input
                    type="text"
                    className="focus:outline-none w-full"
                    placeholder="닉네임을 입력해주세요"
                    onChange={onUsernameChange}
                    value={userName}
                  />
                </div>
              </div>
            </div>
            <div className="birthday-box border-b-sub1 border-b-[0.5px] py-5 text-font1 font-sanslight ">
              <div className="grid grid-cols-3 mx-3">
                <div className="category col-span-1 flex items-center">
                  <span>생년월일</span>
                </div>
                <div className="input-box col-span-2">
                  <input
                    type="text"
                    className="focus:outline-none w-full"
                    placeholder="YYYY.MM.DD"
                    value={userBirthday}
                    onChange={onUserBirthdayChange}
                  />
                </div>
              </div>
            </div>
            <div className="sex-box border-b-sub1 border-b-[1px] py-5 text-font1 font-sanslight ">
              <div className="grid grid-cols-3 mx-3">
                <div className="category col-span-1 flex items-center">
                  <span>성별</span>
                </div>
                <div className="input-box col-span-2">
                  <select
                    name="sex"
                    id="sex"
                    className="focus:outline-none"
                    onChange={onUserSexChange}
                  >
                    <option value={false}>여자</option>
                    <option value={true}>남자</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="btns-box mx-10 mt-8 flex justify-end font-sansultralight text-white text-sm">
            <div className="save-box">
              <button
                className="mr-2 bg-main w-full h-full px-4 py-1 rounded-md hover:bg-sub1 cursor-pointer"
                onClick={onSubmit}
              >
                저장
              </button>
            </div>
            <div className="cancel-box">
              <button
                className="ml-2 bg-font2 w-full h-full px-4 py-1 rounded-md hover:bg-sub1 cursor-pointer"
                onClick={() => {
                  router.push(`/profile/${router.query.username}`);
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="logout-signout-box flex justify-end mx-10 mt-20 font-sansultralight text-xs mb-14">
        <button className="logout mr-2 hover:text-font1">로그아웃</button>
        <span>|</span>
        <button className="signout ml-2 hover:text-font1">회원탈퇴</button>
      </div>
    </>
  );
}

export default Edit;
