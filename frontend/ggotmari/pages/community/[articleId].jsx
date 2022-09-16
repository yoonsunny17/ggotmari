import { useRouter } from "next/router";
import { useState } from "react";
import ProfileImg from "../../components/atoms/common/ProfileImg";
import { AiOutlineMore } from "react-icons/ai";
import FlowerTag from "../../components/atoms/common/FlowerTag";
import CommentDrawer from "../../components/organisms/community/CommentDrawer";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

function ArticleDetail() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const article = {
    articleUser: {
      userId: 1,
      userName: "sangchuman",
      userImage:
        "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0c7e7405-a032-4dc2-a3e6-7c7de633b383_%EC%A7%B1%EA%B5%AC%EB%BF%8C.jpg",
      follower: 45,
      following: 56,
      isFollow: true,
      isMe: false,
    },
    articleTitle: "여자친구한테 칭찬 받았어요",
    articleContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat vel quam ...Suspendisse placerat vel quam ...Suspendisse placerat vel quam ...Suspendisse placerat vel quam ...Suspendisse placerat vel quam ...Suspendisse placerat vel quam ...Suspendisse Suspendisse placerat vel quam ...Suspendisse placerat vel quam ...Suspendisse placerat vel quam ...Suspendisse Suspendisse placerat vel quam ...",
    articleImages: [
      "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/00bf16c0-06d3-4a01-82f0-9f882d3333f5_%EC%8A%A4%ED%8F%B0%EC%A7%80%EB%B0%A5%EB%B0%A5.jpg",
    ],
    articleDate: "2022.09.07 14:04",
    tags: [
      {
        subjectId: 1,
        subjectName: "거베라",
      },
      {
        subjectId: 2,
        subjectName: "장미",
      },
    ],
    isLike: false,
    likeCount: 15,
    commentCount: 5,
    comments: [
      {
        userId: 1,
        userImage: String,
        userName: String,
        commentId: Number,
        commentContent: String,
        isMe: Boolean,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center h-16 px-4">
        <div className="flex flex-row h-1/2">
          <ProfileImg imgSrc={article.articleUser.userImage} />
          <div className="ml-2">
            <p className="text-xs font-sans text-black">
              {article.articleUser.userName}
            </p>
            <p className="text-[4px] font-sans">
              팔로워 {article.articleUser.follower} 팔로잉{" "}
              {article.articleUser.following}
            </p>
          </div>
        </div>
        <AiOutlineMore className="text-2xl text-black cursor-pointer" />
      </div>
      <div className="w-full aspect-square bg-main"></div>
      <div>
        <div className="flex flex-col px-4 pt-4 pb-2">
          <div className="text-black font-medium font-sans">
            {article.articleTitle}
          </div>
          <div className="my-2">
            {article.tags.map((flowerTag) => (
              <FlowerTag
                flowerName={flowerTag.subjectName}
                key={flowerTag.subjectName}
              />
            ))}
          </div>
          <div className="flex flex-row justify-between items-end">
            <div>
              <AiOutlineHeart className="inline text-red-600" />{" "}
              {article.likeCount >= 100 ? "99+" : article.likeCount}
              <AiOutlineComment className="inline ml-2" />{" "}
              {article.commentCount >= 100 ? "99+" : article.commentCount}
            </div>
            <div className="text-sm">{article.articleDate}</div>
          </div>
        </div>
        <hr />
        <div className="p-4">{article.articleContent}</div>
        <div className="h-14" onClick={() => setIsOpen(true)}>
          comment
        </div>
        <CommentDrawer isOpen={isOpen} setIsOpen={setIsOpen}></CommentDrawer>
      </div>
      <div className="h-14"></div>
    </div>
  );
}

export default ArticleDetail;
