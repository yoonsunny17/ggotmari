import { useRouter } from "next/router";
import { IoMdHeart } from "react-icons/io";
import Image from "next/image";

function LikeImage({ articleId, articleImage, userName, likes, articleTitle }) {
  const router = useRouter();
  return (
    <div className="aspect-square col-span-1 flex flex-col">
      <div className="article-img cursor-pointer w-full h-full relative">
        {/* <img
          src={articleImage}
          alt={`${articleTitle} 대표 이미지입니다.`}
          className="article-image w-full h-full object-cover rounded-md"
          onClick={() => {
            router.push(`/community/${articleId}`);
          }}
        /> */}
        <Image
          src={articleImage}
          alt={`${articleTitle} 대표 이미지입니다.`}
          layout="fill"
          className="article-image w-full h-full object-cover rounded-md"
          objectFit="cover"
          priority
          onClick={() => {
            router.push(`/community/${articleId}`);
          }}
        />
      </div>
      <div className="relative">
        <div className="heart-box flex justify-end w-full h-fit absolute bottom-5 right-1">
          <p className="flex items-center text-xs p-0.5 text-white bg-font4/40 rounded-md">
            <IoMdHeart size={15} color="red" />
            {likes > 99 ? "99+" : `${likes}`}
          </p>
        </div>
        <p className="username cursor-pointer font-sans text-xs pt-0.5 text-font2 overflow-hidden text-ellipsis">
          @{userName}
        </p>
      </div>
    </div>
  );
}

export default LikeImage;
