import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

import kakao_oauth from "../../assets/kakao_login_large_narrow.png";

export default function Login() {
  const router = useRouter();
  const REST_API_KEY = "bcf2bd5b8708530d7dc5a312ad648204";
  const REDIRECT_URI = "https://j7a303.p.ssafy.io/login/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleLoginClick = () => {
    router.push(KAKAO_AUTH_URL);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-login bg-cover bg-center">
      <div className="text-center mb-52">
        <div className="font-sansbold text-2xl pb-2">로그인</div>
        <div className="font-sans pb-12">
          카카오 로그인을 통해
          <br />
          간편하게 꽃마리를 이용해 보세요
        </div>
        <div className="">
          <button onClick={handleLoginClick}>
            {/* <img src={kakao_oauth.src} /> */}
            <Image
              src={kakao_oauth.src}
              layout="fixed"
              width={192}
              height={48}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
