import { useState, useEffect } from "react";
import kakao_oauth from "../../assets/kakao_login_large_narrow.png";

export default function Login() {
  const REST_API_KEY = "bcf2bd5b8708530d7dc5a312ad648204";
  const REDIRECT_URI = "https://j7a303.p.ssafy.io/login/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const loginBtn = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    // <div className="flex justify-center relative">
    <div className="flex justify-center items-center h-screen bg-[url(https://images.unsplash.com/photo-1495583237039-44cb1143f0b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)] bg-cover bg-center">
      <div className="text-center mb-52">
        <div className="font-sansbold text-2xl pb-2">로그인</div>
        <div className="font-sans pb-12">
          카카오 로그인을 통해
          <br />
          간편하게 꽃마리를 이용해 보세요
        </div>
        <div className="">
          <button className="w-48 h-12" onClick={loginBtn}>
            <img src={kakao_oauth.src} />
          </button>
        </div>
      </div>
    </div>
    // <div className="place-content-center">
    //   <div className="text-center absolute top-1/2">
    //     <div className="font-sansbold text-2xl pb-2">로그인</div>
    //     <div className="font-sans text-md pb-14">
    //       카카오 로그인을 통해
    //       <br />
    //       간편하게 꽃마리를 이용해 보세요
    //     </div>
    //     <div className="flex justify-center">
    //       <button className="w-48 h-12" onClick={loginBtn}>
    //         <img src={kakao_oauth.src} />
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
