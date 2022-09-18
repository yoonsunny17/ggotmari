import { IoMdHeart } from "react-icons/io";

function LikeImage({ articleId, articleImage, userName, likes }) {
  console.log({ articleId, articleImage, userName, likes });
  return (
    <div className="aspect-square col-span-1 p-1.5">
      <div className="article-img cursor-pointer w-full h-full grid justify-items-end rounded-md bg-[url('https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg')] bg-cover">
        <div className="heart-box flex items-end p-1">
          <span className="flex items-center text-xs p-0.5 text-white bg-[#84898C] rounded-md">
            <IoMdHeart size={15} color="red" />
            {likes > 99 ? "99+" : `${likes}`}
          </span>
        </div>
      </div>
      <span className="username text-font2 font-sansultralight text-[0.5rem]">
        @{userName}
      </span>
    </div>
  );
}

export default LikeImage;
