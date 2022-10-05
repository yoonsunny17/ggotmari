import { useRouter } from "next/router";
import Image from "next/image";

function CollectionImage({ flowerImage, kindId, kindName, subjectId }) {
  const router = useRouter();
  return (
    <>
      <div className="aspect-square flower-img-box relative">
        {/* <img
          src={flowerImage}
          alt={`${kindName} 꽃 이미지 입니다.`}
          className="flower-img w-full h-full rounded-md cursor-pointer"
          onClick={() => {
            router.push(`/flower/${kindId}`);
          }}
        /> */}
        <Image
          src={flowerImage}
          alt={`${kindName} 꽃 이미지 입니다.`}
          layout="fill"
          className="flower-img w-full h-full rounded-md cursor-pointer"
          objectFit="cover"
          priority
          onClick={() => {
            router.push({
              pathname: `/flower/${subjectId}`,
              query: { kindId: kindId },
            });
          }}
        />
      </div>
      <div className="flower-title cursor-pointer font-sans pt-0.5 text-font2 text-xs overflow-hidden text-ellipsis">
        {kindName}
      </div>
    </>
  );
}

export default CollectionImage;
