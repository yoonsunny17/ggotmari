import { useRouter } from "next/router";
import Flower from "../assets/404/404flower.jpg";
import Image from "next/image";

function Page404() {
  const router = useRouter();
  return (
    <div className="404 w-screen font-maru">
      <div className="404 flex justify-center mt-24 text-6xl text-main">
        <span>404</span>
      </div>
      <div className="404-txt flex justify-center text-main mt-14 text-xl">
        <span>페이지를 찾을 수 없습니다.</span>
      </div>
      <div className="404-img aspect-square mx-16 flex justify-center mt-14 relative">
        {/* <img src={Flower.src} alt="404페이지 꽃" /> */}
        <Image
          src={Flower.src}
          alt="404페이지 꽃"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="404-btn flex justify-center mt-14 cursor-pointer text-md text-white h-10">
        <button
          className="w-3/5 bg-sub1 rounded-md hover:bg-main"
          onClick={() => router.push("/")}
        >
          HOME
        </button>
      </div>
    </div>
  );
}

export default Page404;
