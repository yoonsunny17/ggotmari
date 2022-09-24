import YJ from "../../../assets/YJ.png";
import { BsCamera } from "react-icons/bs";
import { IoRefreshOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

function Edit() {
  // user 정보 받아온 뒤
  // 라우터와 유저네임 비교 후
  // 다르면 잘못된 접근입니다. alert 띄우고
  // home으로 보내기

  const [usernameValue, setUsernameValue] = useState("");
  const [profileImage, setProfileImage] = useState([]);
  const [profileImagePreview, setProfileImagePreview] = useState(YJ.src);
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

  // 서버 통신 짤 코드

  const getInfo = () => {
    const info = {
      status: 200,
      message: "회원 정보 조회 성공",
      isMe: true,
      user: {
        userName: "TheYJBaby",
        followingCount: 20,
        followerCount: 2000,
        userImage:
          "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
        isFollow: true,
      },
      articles: [
        {
          articleId: 1,
          articleTitle: "제니1",
          articleImage:
            "https://images.chosun.com/resizer/fo-0AnY_2j3QZ2DbEuxxVc0VSZQ=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/6Y6TZ5MYRVGFDNVP6FAEPRLIKQ.jpg",
        },
        {
          articleId: 2,
          articleTitle: "제니1",
          articleImage:
            "https://images.chosun.com/resizer/fo-0AnY_2j3QZ2DbEuxxVc0VSZQ=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/6Y6TZ5MYRVGFDNVP6FAEPRLIKQ.jpg",
        },
        {
          articleId: 3,
          articleTitle: "제니1",
          articleImage:
            "https://images.chosun.com/resizer/fo-0AnY_2j3QZ2DbEuxxVc0VSZQ=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/6Y6TZ5MYRVGFDNVP6FAEPRLIKQ.jpg",
        },
        {
          articleId: 4,
          articleTitle: "제니1",
          articleImage:
            "https://images.chosun.com/resizer/fo-0AnY_2j3QZ2DbEuxxVc0VSZQ=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/6Y6TZ5MYRVGFDNVP6FAEPRLIKQ.jpg",
        },
      ],
      likeFlowers: [
        {
          tag: "가족",
          flowers: [
            {
              flowerImage:
                "https://file2.nocutnews.co.kr/newsroom/image/2021/06/13/202106131759472028_0.jpg",
              subjectId: 1,
              kindId: 1,
              kindName: "BTS",
            },
            {
              flowerImage:
                "https://file2.nocutnews.co.kr/newsroom/image/2021/06/13/202106131759472028_0.jpg",
              subjectId: 2,
              kindId: 2,
              kindName: "BTS2",
            },
          ],
        },
        {
          tag: "친구",
          flowers: [
            {
              flowerImage:
                "https://file2.nocutnews.co.kr/newsroom/image/2021/06/13/202106131759472028_0.jpg",
              subjectId: 1,
              kindId: 1,
              kindName: "BTS",
            },
            {
              flowerImage:
                "https://file2.nocutnews.co.kr/newsroom/image/2021/06/13/202106131759472028_0.jpg",
              subjectId: 2,
              kindId: 2,
              kindName: "BTS2",
            },
          ],
        },
      ],
      likeArticles: [
        {
          articleId: 1,
          articleImage:
            "https://photo.jtbc.joins.com/news/2015/06/18/201506182141183067.jpg",
          userName: "GD",
          likes: 132,
        },
      ],
    };
    setUserInfo(info);
  };

  useEffect(getInfo, []);
  useEffect(() => {
    setUsernameValue(userInfo.user.userName);
    setProfileImage(userInfo.user.userImage);
    setProfileImagePreview(userInfo.user.userImage);
  }, [userInfo]);

  const onUsernameChange = (event) => {
    setUsernameValue(event.target.value);
  };

  const changeProfileImage = (event) => {
    setProfileImage(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    setProfileImagePreview(url);
  };

  const resetProfileImage = () => {
    setProfileImage([]);
    setProfileImagePreview(YJ.src);
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
                src={profileImagePreview}
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
              onChange={changeProfileImage}
              className="w-0"
            />
            <span className="text-xl">|</span>
            <span
              className="ml-2 text-sm flex items-center cursor-pointer"
              onClick={resetProfileImage}
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
                    value={usernameValue}
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
                  <select name="sex" id="sex" className="focus:outline-none">
                    <option value="0">여자</option>
                    <option value="1">남자</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="btns-box mx-10 mt-8 flex justify-end font-sansultralight text-white text-sm">
            <div className="save-box">
              <button className="mr-2 bg-main w-full h-full px-4 py-1 rounded-md hover:bg-sub1 cursor-pointer">
                저장
              </button>
            </div>
            <div className="cancel-box">
              <button className="ml-2 bg-font2 w-full h-full px-4 py-1 rounded-md hover:bg-sub1 cursor-pointer">
                취소
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="logout-signout-box flex justify-end mx-10 mt-20 font-sansultralight text-xs">
        <button className="logout mr-2 hover:text-font1">로그아웃</button>
        <span>|</span>
        <button className="signout ml-2 hover:text-font1">회원탈퇴</button>
      </div>
    </>
  );
}

export default Edit;
