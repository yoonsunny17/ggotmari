import { useRouter } from "next/router";

function CollectionImage({ flowerImage, kindId, kindName }) {
  const router = useRouter();
  return (
    <>
      <div className="aspect-square flower-img-box">
        <img
          src={flowerImage}
          alt={`${kindName} 꽃 이미지 입니다.`}
          className="flower-img w-full h-full rounded-md cursor-pointer"
          onClick={() => {
            router.push(`/flower/${kindId}`);
          }}
        />
      </div>
      <div className="flower-title cursor-pointer">{kindName}</div>
    </>
  );
}

export default CollectionImage;
