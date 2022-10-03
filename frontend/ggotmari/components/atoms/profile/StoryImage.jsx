import { useRouter } from "next/router";
import Image from "next/image";

function StoryImage({ url, title, id }) {
  const router = useRouter();
  return (
    <div className="aspect-square col-span-1 relative">
      {/* <img
        src={url}
        alt={`${title} 대표 이미지입니다.`}
        className="w-full h-full object-cover rounded-md cursor-pointer"
        onClick={() => router.push(`/community/${id}`)}
      /> */}
      <Image
        src={url}
        alt={`${title} 대표 이미지입니다.`}
        layout="fill"
        objectFit="cover"
        className="object-cover rounded-md cursor-pointer"
        onClick={() => router.push(`/community/${id}`)}
      />
    </div>
  );
}

export default StoryImage;
