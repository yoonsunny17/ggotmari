import { useRouter } from "next/router";
import ImageSquare from "../../atoms/common/ImageSquare";

function FlowerCard({ flower }) {
  const router = useRouter();
  const { kindId, kindImage, kindName, subjectId, subjectName } = flower;

  return (
    <div
      className="flex flex-col w-32 h-44 space-y-0.5 justify-center my-1 mx-3"
      onClick={() =>
        router.push({
          pathname: `/flower/${subjectId}`,
          query: { kindId: kindId },
        })
      }
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
