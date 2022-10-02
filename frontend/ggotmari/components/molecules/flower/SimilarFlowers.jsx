import { useRouter } from "next/router";
import Image from "next/image";

function SimilarFlowers({
  info: { kindImage, kindId, kindName, subjectId, subjectName },
}) {
  const router = useRouter();
  const handlePostClick = () => {
    router.push(`/flower/${kindId}`);
  };
  // const handlePostClick = () => {
  //   router.push(
  //     {
  //       pathname: `${kindId}`,
  //     },
  //     `${kindId}`
  //   );
  // };
  return (
    <div className="h-full">
      <Image
        onClick={handlePostClick}
        src={kindImage}
        alt={`${kindName + "-" + subjectName}`}
        // layout="fill"
        layout="responsive"
        width={500}
        height={500}
        objectFit="cover"
        className="cursor-pointer rounded-md aspect-square w-full h-full"
      />
      {/* <div className="cursor-pointer aspect-square"> */}
      {/* <img
        onClick={handlePostClick}
        src={kindImage}
        alt={`${kindName} + ${subjectName}`}
        className="cursor-pointer rounded-md w-full h-full aspect-square object-cover"
      /> */}
      {/* <div className="cursor-pointer rounded-md aspect-square w-full h-full">
      </div> */}

      <div className="font-sans text-font2 text-xs pt-1 pb-2">{kindName}</div>
    </div>
  );
}

export default SimilarFlowers;
