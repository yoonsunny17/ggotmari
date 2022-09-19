import { useRouter } from "next/router";
import { IoMdHeart } from "react-icons/io";

// function CommunityCard({ info: { username, imgUrl, likeNumbs } }) {
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
        <img
          src={imgUrl}
          alt="communityCard"
          className="w-full h-full object-cover"
        />
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
