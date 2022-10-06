import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../components/atoms/common/Header";
import Head from "next/head";
import { postLetterRecomm } from "../../api/recommend";

function LetterResult() {
  return (
    <div>
      <Head>
        <title>Letter | GGOTMARI</title>
        <meta
          property="og:title"
          content="Letter Based Recommended Flower"
          key="Letter Based Recommended Flower"
        />
        <meta name="description" content="Letter Based Recommended Flower" />
      </Head>
      <Header text={"꽃에 담은 편지"} />
      <Image
        src=""
        alt=""
        width="500"
        height="500"
        layout="responsive"
        priority
      />
      <div>recommend result page</div>
    </div>
  );
}

export default LetterResult;
