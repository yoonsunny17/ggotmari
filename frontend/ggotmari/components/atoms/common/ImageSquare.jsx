import Image from "next/image";

function ImageSquare({ imageSrc }) {
  return (
    <div className="w-full aspect-square bg-main overflow-hidden rounded-lg relative">
      {/* <img className="w-full h-full object-cover" src={imageSrc} /> */}
      <Image src={imageSrc} layout="fill" className="object-cover" />
    </div>
  );
}

export default ImageSquare;
