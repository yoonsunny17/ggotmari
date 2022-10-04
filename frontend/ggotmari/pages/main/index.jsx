import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function NonLoginMain() {
  return (
    <>
      <Head>
        <title>NonLoginMain | GGOTMARI</title>
        <meta property="og:title" content="NonLogin Main Page" key="nonlogin" />
        <meta name="description" content="Mainpage for not logged user." />
      </Head>

      <div className="h-screen carousel carousel-vertical">
        <div className="carousel-item h-full">
          <div className="relative">
            <div className=" z-10 absolute font-sans text-font3 top-1/4">
              <h1 className="text-4xl drop-shadow-md">
                꽃 상세 정보 검색 서비스
              </h1>
              <h1 className="text-2xl drop-shadow-sm pt-4">
                페이지 설명 설명 설명 설명 <br />
                설명 설명 설명 <br />
                설명 설명 어쩌구 저쩌구 랄ㄹㄹ랄
              </h1>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1522125495501-bccacb4dc295?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=711&q=80"
              alt="nonlogin carousel1"
              width={500}
              height={1100}
              objectFit="cover"
              objectPosition="right"
              priority
              className="brightness-[0.93] opacity-85"
            />
          </div>
        </div>
        <div className="carousel-item h-full">
          <div className="relative">
            <div className=" z-10 absolute font-sans text-font3 top-1/4">
              <h1 className="text-4xl drop-shadow-md">
                편지를 통한 꽃 추천 서비스
              </h1>
              <h1 className="text-2xl drop-shadow-sm pt-4">
                페이지 설명 설명 설명 설명 <br />
                설명 설명 설명 <br />
                설명 설명 어쩌구 저쩌구 랄ㄹㄹ랄
              </h1>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1587316830148-c9b01df2da38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="nonlogin carousel2"
              width={500}
              height={1100}
              objectFit="cover"
              objectPosition="left"
              priority
            />
          </div>
        </div>
        <div className="carousel-item h-full">
          <div className="relative">
            <div className="text-right ml-5 z-10 absolute font-sans text-font3 top-1/4">
              <h1 className="text-4xl drop-shadow-md">커뮤니티 서비스</h1>
              <h1 className="text-2xl drop-shadow-sm pt-4">
                페이지 설명 설명 설명 설명 <br />
                설명 설명 설명 <br />
                설명 설명 어쩌구 저쩌구 랄ㄹㄹ랄
              </h1>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1590872000386-4348c6393115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              alt="nonlogin carousel3"
              width={500}
              height={1100}
              objectFit="cover"
              objectPosition="right"
              priority
            />
          </div>
        </div>
        <div className="carousel-item h-full">
          <div className="relative">
            <div className=" z-10 absolute font-sans text-font3 top-1/4">
              <h1 className="text-4xl drop-shadow-md">
                꽃 상세 정보 검색 서비스
              </h1>
              <h1 className="text-2xl drop-shadow-sm pt-4">
                페이지 설명 설명 설명 설명 <br />
                설명 설명 설명 <br />
                설명 설명 어쩌구 저쩌구 랄ㄹㄹ랄
              </h1>
              <div className="py-12">
                <a href="/login">꽃마리 시작하기</a>
              </div>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1596268107240-da2d38e14fc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="nonlogin carousel4"
              width={500}
              height={1000}
              objectFit="cover"
              objectPosition="left"
              priority
            />
          </div>
        </div>
      </div>
    </>

    // <div>
    //   <Image />
    //   <div>non login main page 로그인 버튼 넣기</div>
    // </div>
  );
}

export default NonLoginMain;
