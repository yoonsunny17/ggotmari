import { useRouter } from "next/router";

function SimilarFlowers({
  info: { imgUrl, kindId, kindName, subjectId, subjectName },
}) {
  const router = useRouter();
  const handlePostClick = () => {
    router.push(
      {
        pathname: `flower/${kindId}`,
      },
      `${kindId}`
    );
  };
  return (
    <div className="h-full">
      <img
        onClick={handlePostClick}
        src={imgUrl}
        alt={`${kindName} + ${subjectName}`}
        className="cursor-pointer rounded-md w-full h-full aspect-square object-cover"
      />
      <div className="font-sans text-font1 text-xs pt-1 pb-2">{kindName}</div>
    </div>
  );
}

export default SimilarFlowers;
