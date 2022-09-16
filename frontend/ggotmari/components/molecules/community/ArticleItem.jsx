import { useRouter } from "next/router";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import FlowerTag from "../../atoms/common/FlowerTag";
import ImageSquare from "../../atoms/common/ImageSquare";

function ArticleItem({ article }) {
  const {
    articleId,
    articleImage,
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
      `community/${articleId}`
    );
  };

  return (
    <div className="flex flex-row my-2 h-32" onClick={handleDetailClick}>
      <div className="flex basis-1/3 flex-col items-end justify-center">
        <div className="w-24">
          <ImageSquare imageSrc={articleImage} />
          <div className="text-xs text-font2 w-full">@{userId}</div>
        </div>
      </div>
      <div className="basis-2/3 flex flex-col justify-center px-2">
        <p className="text-sm font-sans font-medium text-black">
          {articleTitle}
        </p>
        <div>
          {tags.map((tag) => (
            <FlowerTag flowerName={tag} key={tag} />
          ))}
        </div>
        <div className="h-12 text-xs text-font2">{articleContent}</div>
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