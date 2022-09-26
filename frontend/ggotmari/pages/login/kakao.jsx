import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doLogin } from "../../api/user";

export default function Kakao() {
  const location = useRouter();
  const [kakaoCode, setKakaoCode] = useState(location.asPath.split("=")[1]);
  useEffect(() => {
    console.log(kakaoCode);

    doLogin(
      kakaoCode,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return <div>카카오 로그인 중</div>;
}
