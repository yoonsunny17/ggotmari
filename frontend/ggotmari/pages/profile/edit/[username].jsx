import YJ from "../../../assets/YJ.png";
import { BsCamera } from "react-icons/bs";
import { IoRefreshOutline } from "react-icons/io5";
import { useState } from "react";

function Edit() {
  // user 정보 받아온 뒤
  // 라우터와 유저네임 비교 후
  // 다르면 잘못된 접근입니다. alert 띄우고
  // home으로 보내기

  const [usernameValue, setUsernameValue] = useState("");

  const onUsernameChange = (event) => {
    console.log(event.target.value);
    setUsernameValue(event.target.value);
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
                src={YJ.src}
                alt=""
                className="image w-full h-full rounded-full"
              />
            </div>
          </div>
          <div className="image-change flex justify-center items-center my-5 text-font1 font-sanslight mb-5">
            <span className="mr-2 text-sm flex items-center cursor-pointer">
              <BsCamera size={20} className="mr-2" />
              사진변경
            </span>
            <span className="text-xl">|</span>
            <span className="ml-2 text-sm flex items-center">
              <IoRefreshOutline size={20} className="mr-1" />
              초기화
            </span>
          </div>
          <div className="info-box mx-10  border-t-sub1 border-t-[1px] text-xl">
            <div className="id-box border-b-sub1 border-b-[0.5px] py-5 text-font1 font-sanslight ">
              <div className="grid grid-cols-3 mx-3">
                <div className="category col-span-1 flex items-center">
                  <span>아이디</span>
                </div>
                <div className="input-box col-span-2">
                  <input
                    type="text"
                    className="focus:outline-none"
                    placeholder="닉네임을 입력해주세요"
                    onChange={onUsernameChange}
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
                    className="focus:outline-none"
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
          <div className="btns-box mx-10 mt-8 flex justify-end font-sansultralight text-white text-lg">
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
      <div className="logout-signout-box flex justify-end mx-10 mt-52 font-sansultralight">
        <button className="logout mr-2 hover:text-font1">로그아웃</button>
        <span>|</span>
        <button className="signout ml-2 hover:text-font1">회원탈퇴</button>
      </div>
    </>
  );
}

export default Edit;
