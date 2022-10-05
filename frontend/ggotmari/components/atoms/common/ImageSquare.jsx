import Image from "next/image";

function ImageSquare({ imageSrc }) {
  return (
    <div className="w-full aspect-square bg-main overflow-hidden rounded-lg relative">
      <Image src={imageSrc} layout="fill" objectFit="cover" priority />
    </div>
  );
}

export default ImageSquare;
