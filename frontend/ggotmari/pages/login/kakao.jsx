import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doLogin } from "../../api/user";
import kakaoLogin from "../../assets/login/login.gif";
import Head from "next/head";

export default function Kakao() {
  const router = useRouter();
  const [kakaoCode, setKakaoCode] = useState(router.asPath.split("=")[1]);
  useEffect(() => {
    doLogin(
      kakaoCode,
      (res) => {
        localStorage.setItem("accessToken", res.data.token);
        router.push("/");
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div className="login h-screen bg-login bg-cover bg-center">
      <Head>
        <title>Login In Process | GGOTMARI</title>
        <meta
          property="og:title"
          content="Login in process"
          key="login in process"
        />
        <meta name="description" content="Login in process." />
      </Head>
      <div className="login-img-box mx-10 pt-40 flex justify-center">
        <img
          src={kakaoLogin.src}
          alt="카카오 로그인 GIF"
          className="login-img w-2/3"
        />
      </div>
      <div className="login-text-box flex justify-center">
        <span className="mt-10 font-sansultralight bg-main/80 text-white px-5 py-3 rounded-md">
          꽃마리로 로그인 중...
        </span>
      </div>
    </div>
  );
}
