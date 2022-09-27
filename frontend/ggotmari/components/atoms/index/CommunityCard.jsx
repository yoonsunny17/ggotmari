import { useRouter } from "next/router";
import Image from "next/image";

import { IoMdHeart } from "react-icons/io";

function CommunityCard({
  info: {
    articleId,
    articleImage,
    userId,
    username,
    articleTitle,
    articleContent,
    articleDate,
    tags,
    commentCount,
    likeCount,
    imgUrl,
  },
}) {
  const router = useRouter();
  const postClickHandler = () => {
    router.push(
      {
        pathname: `community/${articleId}`,
      },
      `community/${articleId}`
    );
  };
  return (
    <div onClick={postClickHandler}>
      <div className="cursor-pointer rounded-lg aspect-square shadow overflow-hidden relative">
        {/* <img
          src={articleImage}
          alt="communityCard"
          className="w-full h-full object-cover"
        /> */}
        <div className="w-full h-full object-cover">
          <Image
            src={articleImage}
            alt="communityCard"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <p className="text-font2">@{username}</p>
        <p className="flex">
          <IoMdHeart size={15} color="red" />{" "}
          {likeCount >= 100 ? (
            "99+"
          ) : (
            <span className="text-font1">{likeCount}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default CommunityCard;
