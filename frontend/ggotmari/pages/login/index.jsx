import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import kakao_oauth from "../../assets/kakao_login_large_narrow.png";

export default function Login() {
  const router = useRouter();
  const REST_API_KEY = "bcf2bd5b8708530d7dc5a312ad648204";
  const REDIRECT_URI = "https://j7a303.p.ssafy/login/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const loginBtn = () => {
    router.push(KAKAO_AUTH_URL);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center mb-40">
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
