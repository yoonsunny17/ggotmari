import { useRouter } from "next/router";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import FlowerTag from "../../atoms/common/FlowerTag";
import ImageSquare from "../../atoms/common/ImageSquare";

function ArticleItem({ article }) {
  const {
    articleId,
    articleImages,
    userId,
    articleTitle,
    articleContent,
    articleDate,
    tags,
    commentCount,
    likeCount,
  } = article;

  const router = useRouter();

  const handleDetailClick = () => {
    router.push(
      {
        pathname: `community/${articleId}`,
      },
      `community/${articleId}`,
    );
  };

  return (
    <div className="flex flex-row my-2 h-32 w-full" onClick={handleDetailClick}>
      <div className="flex flex-col items-end justify-center">
        <div className="w-24">
          <ImageSquare imageSrc={articleImages[0]} />
          <div className="text-xs text-font2 w-full">@{userId}</div>
        </div>
      </div>
      <div className="flex flex-col justify-center px-2">
        <div className="h-24">
          <p className="text-sm font-sans font-medium text-black">
            {articleTitle}
          </p>
          <div>
            {tags.map((tag) => (
              <FlowerTag flowerName={tag} key={tag} isRemovable={false} />
            ))}
          </div>
          <div className="h-1/2 text-xs text-font2">{articleContent}</div>
        </div>
        <div className="text-xs text-font2 w-full">
          <AiFillHeart className="inline text-red-600" />{" "}
          {`${likeCount >= 100 ? "99+" : likeCount} `}
          <AiOutlineComment className="inline ml-2" />{" "}
          {commentCount >= 100 ? "99+" : commentCount}
        </div>
      </div>
    </div>
  );
}

export default ArticleItem;
