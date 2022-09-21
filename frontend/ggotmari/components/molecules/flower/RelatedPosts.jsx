import { useRouter } from "next/router";
import { IoMdHeart } from "react-icons/io";

function RelatedPosts({
  info: { articleId, articleImage, likeCount, username },
}) {
  const router = useRouter();
  // TODO: community/${articleId} 라우터 이동
  const postClickHandler = () => {};
  return (
    <div onClick={postClickHandler} className="font-sans">
      <div className="">
        <img
          src={articleImage}
          alt={articleId}
          className="w-full h-full aspect-square object-cover rounded-md overflow-hidden brightness-98"
        />
        <div className="-translate-y-6">
          <div className="flex items-center bg-font4/40 w-fit px-1.5 py-0.5 rounded-md">
            <IoMdHeart size={14} color="red" />{" "}
            <p className="text-[11px] pl-0.5 text-font3">
              {likeCount >= 100 ? "+99" : `${likeCount}`}
            </p>
          </div>
          <div className="text-[11px] text-font2 pt-1">@{username}</div>
        </div>
      </div>
    </div>
  );
}

export default RelatedPosts;
