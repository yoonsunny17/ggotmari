import { useRouter } from "next/router";
import { IoMdHeart } from "react-icons/io";

function LikeImage({ articleId, articleImage, userName, likes, articleTitle }) {
  const router = useRouter();
  return (
    <div className="aspect-square col-span-1 p-1.5 flex flex-col">
      <div className={`article-img cursor-pointer w-full h-full`}>
        <img
          src={articleImage}
          alt={`${articleTitle} 대표 이미지입니다.`}
          className="article-image w-full h-full object-cover rounded-md"
          onClick={() => {
            router.push(`/coummunity/${articleId}`);
          }}
        />
      </div>
      <div className="-translate-y-6">
        <div className="heart-box flex justify-end w-full h-fit">
          <span className="flex items-center text-xs p-0.5 text-white bg-font4/40 rounded-md ">
            <IoMdHeart size={15} color="red" />
            {likes > 99 ? "99+" : `${likes}`}
          </span>
        </div>
        <span className="username text-font2 font-sansultralight text-[0.5rem]">
          @{userName}
        </span>
      </div>
    </div>
  );
}

export default LikeImage;
