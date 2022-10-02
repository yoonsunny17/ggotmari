import { useRouter } from "next/router";
import Image from "next/image";

function StoryImage({ url, title, id }) {
  const router = useRouter();
  return (
    <div className="aspect-square col-span-1 p-1.5">
      <img
        src={url}
        alt={`${title} 대표 이미지입니다.`}
        className="w-full h-full object-cover rounded-md cursor-pointer"
        onClick={() => router.push(`/community/${id}`)}
      />
      {/* <Image
        src={url}
        alt={`${title} 대표 이미지입니다.`}
        layout="fill"
        className="object-cover rounded-md cursor-pointer p-1.5"
      /> */}
    </div>
  );
}

export default StoryImage;
