import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../components/atoms/common/Header";
import { postLetterRecomm } from "../../api/recommend";

function LetterResult() {
  return (
    <div>
      <Header text={"꽃에 담은 편지"} />
      <Image src="" alt="" width="500" height="500" layout="responsive" />
      <div>recommend result page</div>
    </div>
  );
}

export default LetterResult;
