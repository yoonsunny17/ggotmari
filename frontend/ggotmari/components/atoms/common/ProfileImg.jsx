import Image from "next/image";

function ProfileImg({ imgSrc }) {
  return (
    <div className="h-full aspect-square overflow-hidden rounded-full relative">
      <Image className="object-cover" src={imgSrc} layout="fill" priority />
    </div>
  );
}

export default ProfileImg;
