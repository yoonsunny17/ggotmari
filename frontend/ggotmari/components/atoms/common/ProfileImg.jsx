import Image from "next/image";

function ProfileImg({ imgSrc }) {
  return (
    <div className="h-full aspect-square overflow-hidden rounded-full relative">
      <Image className="object-cover" src={imgSrc} layout="fill" />
    </div>
  );
}

export default ProfileImg;
