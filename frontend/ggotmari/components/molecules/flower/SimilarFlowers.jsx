import { useRouter } from "next/router";
import Image from "next/image";

function SimilarFlowers({
  info: { imgUrl, kindId, kindName, subjectId, subjectName },
}) {
  const router = useRouter();
  const handlePostClick = () => {
    router.push(
      {
        pathname: `${subjectId}`,
      },
      `${subjectId}`
    );
  };
  return (
    <div className="h-full">
      {/* <div className="cursor-pointer aspect-square"> */}
      <img
        onClick={handlePostClick}
        src={imgUrl}
        alt={`${kindName} + ${subjectName}`}
        className="cursor-pointer rounded-md w-full h-full aspect-square object-cover"
      />
      {/* <div className="cursor-pointer rounded-md aspect-square w-full h-full">
        <Image
          onClick={handlePostClick}
          src={imgUrl}
          alt={`${kindName + "-" + subjectName}`}
          // layout="fill"
          layout="fill"
          objectFit="cover"
          className="cursor-pointer rounded-md aspect-square w-full h-full"
        />
      </div> */}

      <div className="font-sans text-font2 text-xs pt-1 pb-2">{kindName}</div>
    </div>
  );
}

export default SimilarFlowers;
