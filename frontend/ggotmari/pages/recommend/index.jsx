import Header from "../../components/atoms/common/Header";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { getOcrRecommend } from "../../api/recommend";
import Head from "next/head";

import WriteLetter from "./letter";
import NotFound from "./notFound";

function RecommendMain() {
  const router = Router;

  // 편지 작성하기 버튼 눌렸니?
  // const [isClicked, setIsClicked] = useState(false);
  // const handleClickBtn = () => {
  //   setIsClicked((current) => !current);
  // };

  // 손편지로 추천받기 버튼이 눌렸니?
  const [isLetterBtn, setIsLetterBtn] = useState(false);
  const handleLetterBtn = () => {
    setIsLetterBtn((current) => !current);
  };

  const [ocrText, setOcrText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const success = (res) => {
    console.log(res);
    setIsSuccess((current) => !current);
    // router.push("/recommend/letter");
    router.push({
      pathname: "/recommend/letter",
      query: {
        ocrLetter: res.data.ocrText,
      },
    });
    // setOcrText(res.data.ocrText);
  };

  console.log(ocrText);

  const fail = (error) => {
    console.log(error);
  };

  const handleImageUpload = (e) => {
    const letterImage = e.target.files[0];
    console.log(letterImage);
    const recommendOcrInfo = {
      format: letterImage.name.split(".")[1],
      name: letterImage.name.split(".")[0],
    };
    console.log(recommendOcrInfo);
    const formdata = new FormData();
    const json = JSON.stringify(recommendOcrInfo);
    formdata.append(
      "recommendOcrInfo",
      new Blob([json], { type: "application/json" })
    );
    formdata.append("image", letterImage);

    getOcrRecommend(formdata, success, fail);
  };

  return (
    <div className="flex flex-col mb-36">
      <Head>
        <title>Letter for Flower | GGOTMARI</title>
        <meta
          property="og:title"
          content="Recommend by Letter"
          key="Recommend by Letter"
        />
        <meta name="description" content="Recommend by Letter" />
      </Head>
      <Header text={"꽃에 담은 편지"} />
      {/* <img
          className="opacity-80 h-full w-full object-cover object-bottom"
          src="https://images.unsplash.com/photo-1597705790378-e30f4c18e427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80"
          alt=""
        /> */}
      {/* 편지 작성하기 버튼이 눌렸다면, writeLetter 보여주기 */}
      <div className="h-48">
        <Image
          src="https://images.unsplash.com/photo-1597705790378-e30f4c18e427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80"
          objectFit="cover"
          layout="responsive"
          width="500"
          height="200"
          objectPosition="bottom"
          priority
          className="opacity-80 h-full w-full"
        />
      </div>

      <div className="font-gangwon text-font1 text-center text-lg">
        &quot;편지로는 표현할 수 없는 감정 <br /> 꽃으로 선물했어요&quot;
      </div>
      <br />
      {/* font-gangwonlight vs font-gangwon */}
      <div className="font-gangwonlight text-center text-font4">
        꽃마리는 회원님의 편지를 읽어보고 <br /> 어울리는 꽃을 추천해 드립니다.
        <br />
        <div className="py-3">
          야생화인 &apos;꽃마리&apos;는 꽃말이 없지만 <br /> 여러분의 편지에는
          꽃말을 달아드리려 합니다.
        </div>
        여러분의 소중한 하루, <br /> 편지와 함께 향기로운 꽃을 같이 선물해
        주세요.
      </div>

      <div className="flex justify-center my-6">
        {/* <div
          onClick={() => router.push("/recommend/letter")}
          className="text-center font-gangwon bg-sub2 rounded-md w-52 py-2 pt-2.5 pb-1.5 text-font3"
        > */}
        <div
          onClick={() => router.push("/recommend/letter")}
          className="text-center font-gangwon bg-sub2 rounded-md w-52 py-2 pt-2.5 pb-1.5 text-font3"
        >
          편지 작성하기
        </div>
      </div>
      <div
        className="flex justify-center text-center"
        onClick={handleLetterBtn}
      >
        <label
          className="font-gangwon bg-sub2 rounded-md w-52 py-2 pt-2.5 pb-1.5 text-font3"
          htmlFor="handLetter"
        >
          손편지로 추천받기
        </label>
        <input
          type="file"
          accept="image/*;capture=camera"
          className="absolute w-0 h-0 p-0 overflow-hidden border-0"
          id="handLetter"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}

export default RecommendMain;
