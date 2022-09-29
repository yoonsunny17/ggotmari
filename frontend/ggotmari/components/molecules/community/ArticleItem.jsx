import { useRouter } from "next/router";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import FlowerTag from "../../atoms/common/FlowerTag";
import ImageSquare from "../../atoms/common/ImageSquare";

function ArticleItem({ article }) {
  const {
    articleId,
    articleImages,
    userName,
    articleTitle,
    articleContent,
    tags,
    commentCount,
    likeCount,
  } = article;

  const router = useRouter();

  const handleDetailClick = () => {
    router.push(`community/${articleId}`);
  };

  return (
    <div
      className="grid grid-rows-[auto_auto] grid-cols-[2fr_5fr] w-full"
      onClick={handleDetailClick}
    >
      <div className="row-start-1 row-end-2 col-start-1 col-end-2 items-end justify-center">
        <ImageSquare imageSrc={articleImages[0]} />
      </div>
      <div className="row-start-2 row-end-3 col-start-1 col-end-2 text-xs text-font2 px-1">
        @{userName}
      </div>
      <div className="row-start-1 row-end-2 col-start-2 col-end-3 grid grid-rows-[1fr_auto_2fr] px-3">
        <div className="row-start-1 row-end-2 flex items-center truncate">
          <p className="text-sm sm:text-lg font-sans font-medium text-black truncate">
            {articleTitle}
          </p>
        </div>
        <div className="row-start-2 row-end-3 flex items-center">
          <div>
            {tags.map((tag, idx) =>
              idx < 2 ? (
                <FlowerTag flowerName={tag} key={tag} isRemovable={false} />
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <div className="row-start-3 row-end-4 flex items-center text-ellipsis py-0.5">
          <p className="text-xs text-font2 text-ellipsis line-clamp-2 sm:line-clamp-4">
            {articleContent}
          </p>
        </div>
      </div>
      <div className="row-start-2 row-end-3 col-start-2 col-end-3 text-xs text-font2 px-3">
        <AiFillHeart className="inline text-red-600" />
        {` ${likeCount >= 100 ? "99+" : likeCount} `}
        <AiOutlineComment className="inline ml-2" />
        {` ${commentCount >= 100 ? "99+" : commentCount}`}
      </div>
    </div>
  );
}

export default ArticleItem;
