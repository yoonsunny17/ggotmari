import { useRouter } from "next/router";
import ImageSquare from "../../atoms/common/ImageSquare";

function FlowerCard({ kindImage, kindName, subjectName, kindId }) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col w-32 h-44 space-y-0.5 justify-center my-1"
      onClick={() => router.push(`/flower/${kindId}`)}
    >
      <ImageSquare imageSrc={kindImage} />
      <div className="text-base text-black font-medium font-sans">
        {kindName}
      </div>
      <div className="text-xs font-sans">{subjectName}</div>
    </div>
  );
}

export default FlowerCard;
