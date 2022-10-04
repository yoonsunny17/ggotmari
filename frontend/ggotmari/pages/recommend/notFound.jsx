import { useRouter } from "next/router";
import Image from "next/image";

import noFlower from "../../assets/profile/collection/noFlowerImg.jpg";
import Header from "../../components/atoms/common/Header";

function NotFound() {
  const router = useRouter();
  return (
    <div className="font-gangwon">
      <Header text={"오늘의 꽃"} />
      <div>
        <Image
          src={noFlower.src}
          alt="not found"
          width={500}
          height={500}
          layout="responsive"
          objectFit="cover"
          priority
        />
        <div className="text-lg text-center mt-6">
          추천해드릴 꽃을 찾지 못했어요
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            router.push("/recommend/letter");
          }}
          className="text-font2 w-52 py-2 pt-2.5 rounded-md text-sm"
        >
          <p className="underline underline-offset-4 hover:text-font1 font-sans">
            다시 추천 받기
          </p>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
