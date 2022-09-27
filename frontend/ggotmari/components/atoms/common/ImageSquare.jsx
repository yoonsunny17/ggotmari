import Image from "next/image";

function ImageSquare({ imageSrc }) {
  return (
    <div className="w-full h-full aspect-square opbj bg-main overflow-hidden rounded-lg relative">
      {/* <img className="w-full h-full object-cover" src={imageSrc} /> */}
      <Image src={imageSrc} layout="fill" objectFit="cover" />
    </div>
  );
}

export default ImageSquare;
