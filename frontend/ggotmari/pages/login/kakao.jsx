import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doLogin } from "../../api/user";

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

  return <div>카카오 로그인 중</div>;
}
