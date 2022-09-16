import { useState, useEffect } from "react";

export default function Login() {
    const REST_API_KEY = "bcf2bd5b8708530d7dc5a312ad648204";
    const REDIRECT_URI = "http://localhost:3000/login/kakao";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    
    const loginBtn = () => {
        window.location.href = KAKAO_AUTH_URL;
    }
    
    return (
        <div>
            <button><img src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png" onClick={loginBtn}/></button>
        </div>
    );
  }
  