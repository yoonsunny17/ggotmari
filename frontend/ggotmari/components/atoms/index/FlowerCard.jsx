import { useRouter } from "next/router";
import Image from "next/image";

function FlowerCard({ info: { subjectId, kindId, flowerName, imgUrl } }) {
  const router = useRouter();
  const handlePostClick = () => {
    router.push(
      {
        pathname: `flower/${subjectId}`,
      },
      `flower/${subjectId}`
    );
  };
  return (
    <div
      onClick={handlePostClick}
      className="cursor-pointer rounded-lg aspect-square overflow-hidden relative brightness-96"
    >
      {/* <img
        className="w-full h-full object-cover"
        src={imgUrl}
        alt={flowerName}
      /> */}
      <Image
        src={imgUrl}
        alt={flowerName}
        layout="fill"
        objectFit="cover"
        // className="w-full h-full object-cover"
      />
    </div>
  );
}

export default FlowerCard;
