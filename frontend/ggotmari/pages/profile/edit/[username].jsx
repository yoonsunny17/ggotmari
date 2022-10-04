import { BsCamera } from "react-icons/bs";
import { IoRefreshOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getUser, editUser, signout } from "../../../api/profile.js";
import Image from "next/image";

function Edit() {
  const router = useRouter();

  // user 정보 받아온 뒤
  // 라우터와 유저네임 비교 후
  // 다르면 잘못된 접근입니다. alert 띄우고
  // home으로 보내기

  // console.log(userName);

  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userImagePreview, setUserImagePreview] = useState(
    "https://ggotmari.s3.ap-northeast-2.amazonaws.com/profile/default.svg"
  );
  const [userSex, setUserSex] = useState(false);
  const [userBirthday, setUserBirthday] = useState("");
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
    setUserName(res.data.user.userName);
    setUserImagePreview(res.data.user.userImage);
    setUserSex(res.data.user.userSex);
    // 생일에서 '-' 제거
    const bday = (bday) => {
      let newBday =
        bday.substring(0, 4) + bday.substring(5, 7) + bday.substring(8, 10);
      return newBday;
    };
    setUserBirthday(
      res.data.user.userBirthday ? bday(res.data.user.userBirthday) : ""
    );
  };

  const getUserFail = (err) => {
    console.log(err);
    alert("잘못된 접근입니다.");
    router.push("/");
  };

  const getInfo = (username) => {
    getUser(username, getUserSuccess, getUserFail);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const username = window.location.pathname.substring(14);
      getInfo(username);
    } else {
      alert("로그인이 필요한 서비스입니다.");
      // router.push("/login");
      router.push("/main");
    }
  }, []);

  // 제출 통신
  const onSubmitSuccess = () => {
    // console.log(res);
    alert("성공적으로 변경되었습니다");
    router.push(`/profile/${userName}`);
  };

  const onSubmitFail = (err) => {
    console.log(err);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // 유효성 검사
    // if (userName.length > 15) {
    //   alert("닉네임은 최대 15글자입니다.");
    //   return;
    // }
    // if (
    //   userBirthday.length !== 0 ||
    //   userBirthday.length > 8 ||
    //   isNaN(userBirthday) ||
    //   +userBirthday.substring(0, 4) < 1900 ||
    //   +userBirthday.substring(0, 4) > 2022 ||
    //   +userBirthday.substring(4, 6) < 1 ||
    //   +userBirthday.substring(4, 6) > 12
    // ) {
    //   alert("생년월일이 잘못되었습니다.");
    //   return;
    // }
    // switch (+userBirthday.substring(4, 6)) {
    //   case 1:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 31) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 2:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 29) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 3:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 31) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 4:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 30) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 5:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 31) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 6:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 30) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 7:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 31) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 8:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 31) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 9:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 30) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 10:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 31) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 11:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 30) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    //   case 12:
    //     if (+userBirthday.substring(6) < 1 || +userBirthday.substring(6) > 31) {
    //       alert("생년월일이 잘못되었습니다.");
    //       return;
    //     }
    // }
    let userPutReq = {};
    if (userBirthday === "") {
      userPutReq = {
        userName: userName,
        // 생일 '-' 추가
        birthday: "",
        sex: userSex,
        profile: userImage ? "" : userImagePreview,
      };
    } else {
      userPutReq = {
        userName: userName,
        // 생일 '-' 추가
        birthday:
          userBirthday.substring(0, 4) +
          "-" +
          userBirthday.substring(4, 6) +
          "-" +
          userBirthday.substring(6, 8),
        sex: userSex,
        profile: userImage ? "" : userImagePreview,
      };
    }

    const formData = new FormData();

    const json = JSON.stringify(userPutReq);
    // console.log(json);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("userPutReq", blob);
    if (userImage) {
      formData.append("multipart", userImage);
    }
    editUser(formData, onSubmitSuccess, onSubmitFail);
  };

  // 회원탈퇴 통신
  const onSignoutSuccess = () => {
    localStorage.removeItem("accessToken");
    // router.push("/login");
    router.push("/main");
    alert("성공적으로 탈퇴되었습니다.");
  };

  const onSignoutFail = (err) => {
    console.log(err);
  };

  const onSignout = () => {
    signout(onSignoutSuccess, onSignoutFail);
  };

  // input값 변경될 때 사용할 함수들
  const changeuserImage = (event) => {
    setUserImage(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    setUserImagePreview(url);
  };

  const onUsernameChange = (event) => {
    if (event.target.value.length > 15) {
      alert("닉네임은 최대 15글자입니다.");
      return;
    } else {
      setUserName(event.target.value);
    }
  };

  const onUserBirthdayChange = (event) => {
    if (isNaN(event.target.value)) {
      alert("생년월일은 숫자만 입력가능합니다. 다시 입력해주세요");
      return;
    }
    if (event.target.value.length === 4) {
      if (+event.target.value < 1900 || event.target.value > 2022) {
        alert("생년은 1900년과 2022년 사이만 입력해주세요.");
        return;
      }
    }
    if (event.target.value.length === 6) {
      // console.log(+event.target.value.substring(4));
      if (
        +event.target.value.substring(4) < 1 ||
        +event.target.value.substring(4) > 12
      ) {
        alert("생월은 1월부터 12월 사이입니다.");
        return;
      }
    }
    if (event.target.value.length === 8) {
      // console.log(+event.target.value.substring(4, 6));
      switch (+event.target.value.substring(4, 6)) {
        case 1:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 31
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 2:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 29
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 3:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 31
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 4:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 30
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 5:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 31
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 6:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 30
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 7:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 31
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 8:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 31
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 9:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 30
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 10:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 31
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 11:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 30
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
        case 12:
          if (
            +event.target.value.substring(6) < 1 ||
            +event.target.value.substring(6) > 31
          ) {
            alert("날짜가 잘못되었습니다.");
            return;
          }
      }
    }
    if (event.target.value.length > 8) {
      alert("생년월일은 최대 8자리 숫자입니다.");
      return;
    }
    setUserBirthday(event.target.value);
  };

  const onUserSexChange = (event) => {
    setUserSex(event.target.value);
  };

  const resetUserImage = () => {
    setUserImage("");
    setUserImagePreview(
      "https://ggotmari.s3.ap-northeast-2.amazonaws.com/profile/default.svg"
    );
  };

  return (
    <>
      <Head>
        <title>Edit | GGOTMARI</title>
        <meta property="og:title" content="Profile Edit" key="edit" />
        <meta name="description" content="User can change their info here." />
      </Head>
      <div className="title flex justify-center">
        <span className="my-8 font-maru text-2xl text-main">프로필 수정</span>
      </div>
      <form action="">
        <div className="profile-edit">
          <div className="image-box flex justify-center">
            <div className="w-2/5 aspect-square relative">
              {/* <img
                src={userImagePreview}
                alt=""
                className="image w-full h-full rounded-full"
              /> */}
              <Image
                src={userImagePreview}
                alt="프로필 미리보기 이미지입니다."
                layout="fill"
                className="image w-full h-full rounded-full"
                objectFit="cover"
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
                  <span>닉네임</span>
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
                    placeholder="YYYYMMDD"
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
        <button
          className="logout mr-2 hover:text-font1"
          onClick={() => {
            localStorage.removeItem("accessToken");
            alert("로그아웃 되었습니다.");
            router.push("/main");
          }}
        >
          로그아웃
        </button>
        <span>|</span>
        <button className="signout ml-2 hover:text-font1" onClick={onSignout}>
          회원탈퇴
        </button>
      </div>
    </>
  );
}

export default Edit;
