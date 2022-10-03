import { useRouter } from "next/router";
import Image from "next/image";

import { IoMdHeart } from "react-icons/io";

function RelatedPosts({
  info: { articleId, articleImage, likeCount, userName },
}) {
  const router = useRouter();
  // TODO: community/${articleId} 라우터 이동
  const postClickHandler = () => {
    router.push(`/community/${articleId}`);
  };
  return (
    <div onClick={postClickHandler} className="font-sans">
      <div className="">
        {/* <img
          src={articleImage}
          alt={articleId}
          className="w-full h-full aspect-square object-cover rounded-md overflow-hidden brightness-98"
        /> */}
        <div className="aspect-square rounded-md overflow-hidden brightness-[0.98]">
          <Image
            src={articleImage}
            alt={articleId}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative">
          <div className="absolute right-1 bottom-1">
            <div className="flex items-center bg-font4/40 w-fit px-1.5 py-0.5 rounded-md">
              <IoMdHeart size={14} color="red" />{" "}
              <p className="text-[11px] pl-0.5 text-font3">
                {likeCount >= 100 ? "+99" : `${likeCount}`}
              </p>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-font2 pt-0.5">@{userName}</div>
      </div>
    </div>
  );
}

export default RelatedPosts;
