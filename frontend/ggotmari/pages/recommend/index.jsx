import Header from "../../components/atoms/common/Header";
import Image from "next/image";
import Router from "next/router";

function RecommendMain() {
  const router = Router;
  return (
    <div className="flex flex-col">
      <Header text={"꽃에 담은 편지"} />
      {/* <img
          className="opacity-80 h-full w-full object-cover object-bottom"
          src="https://images.unsplash.com/photo-1597705790378-e30f4c18e427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80"
          alt=""
        /> */}
      <div className="h-52">
        <Image
          src="https://images.unsplash.com/photo-1597705790378-e30f4c18e427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80"
          objectFit="cover"
          layout="responsive"
          width="500"
          height="200"
          objectPosition="bottom"
          className="opacity-80 h-full w-full"
        />
      </div>

      <div className="font-gangwon text-font1 text-center text-lg mt-4">
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

      <div className="flex justify-center">
        <button
          onClick={() => router.push("/recommend/write")}
          className="mt-6 font-gangwon bg-sub2 rounded-md w-52 py-2 pt-2.5 pb-1.5 text-font3"
        >
          편지 작성하기
        </button>
      </div>
    </div>
  );
}

export default RecommendMain;
