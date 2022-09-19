import {useRouter} from 'next/router'
import { useState, useEffect } from "react";
import axios from 'axios'

export default function Kakao() {
    const location = useRouter();
    const [kakaoCode, setKakaoCode] = useState(location.asPath.split("=")[1]);
    useEffect(() => {
        console.log(kakaoCode);
       
        axios.post("http://localhost:8080/api/auth/login", {
             code: kakaoCode 
        })
        .then((res) => {
            console.log(res);
        })
            .catch((error) => {
            console.log(error);
        })
    },[])
    
    return (
        <div>
            카카오 로그인 중
        </div>
    );
  }
  