import { getDailyFlower } from "../../../api/flower";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import noImage from "../../../assets/profile/collection/noFlowerImg.jpg";

function DailyFlowerDetail({}) {
  const [dailyFlower, setDailyFlower] = useState([]);

  useEffect(() => {
    getDailyFlower(
      (res) => {
        setDailyFlower(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <Image
        src={
          dailyFlower.dailyFlowerImage
            ? dailyFlower.dailyFlowerImage
            : noImage.src
        }
        alt=""
        width={500}
        height={500}
        layout="responsive"
        objectFit="cover"
        priority
      />
      <div className="my-10 text-center font-gangwon text-font1">
        오늘의 꽃은{" "}
        <span className="text-xl bg-extra2/60">
          {dailyFlower.dailyFlowerName}
        </span>{" "}
        입니다
        <br />
        {dailyFlower.dailyFlowerName}의 꽃말은 &apos;
        <span className="text-xl bg-sub1/60">
          {dailyFlower.dailyFlowerLanguage}
        </span>
        &apos; 입니다.
        <br />
        <div className="mt-6 px-6">
          <p className="">- 오늘의 꽃점 -</p>
          <div className="py-1 px-1 mb-24">
            {dailyFlower.dailyFlowerContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyFlowerDetail;
