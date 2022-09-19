import { useRouter } from "next/router";
import { useState } from "react";
import ProfileImg from "../../components/atoms/common/ProfileImg";
import { AiOutlineMore, AiOutlineUp } from "react-icons/ai";
import FlowerTag from "../../components/atoms/common/FlowerTag";
import CommentDrawer from "../../components/organisms/community/CommentDrawer";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import CommentItem from "../../components/molecules/community/CommentItem";

function ArticleDetail() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const loginUserImg =
    "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0c7e7405-a032-4dc2-a3e6-7c7de633b383_%EC%A7%B1%EA%B5%AC%EB%BF%8C.jpg";
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
      "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/00bf16c0-06d3-4a01-82f0-9f882d3333f5_%EC%8A%A4%ED%8F%B0%EC%A7%80%EB%B0%A5%EB%B0%A5.jpg",
      "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/00bf16c0-06d3-4a01-82f0-9f882d3333f5_%EC%8A%A4%ED%8F%B0%EC%A7%80%EB%B0%A5%EB%B0%A5.jpg",
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
    commentCount: 4,
    comments: [
      {
        userId: 2,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/01a3ce7b-7e99-48cb-b38a-f8426eb821c1_%EC%95%A0%EA%B8%B0%EC%A7%B1%EA%B5%AC.jpg",
        userName: "shinjjang",
        commentId: 1,
        commentContent: "꽃 너무 이쁘네요",
        isMe: false,
      },
      {
        userId: 3,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0ce6a718-72f7-4d0c-a203-7731e1d4df3f_%EC%95%84%EA%B8%B0%EB%9A%B1%EC%9D%B4.jpg",
        userName: "odyssey36",
        commentId: 2,
        commentContent: "꽃 이름 뭔지 알 수 있을까요?",
        isMe: false,
      },
      {
        userId: 1,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0c7e7405-a032-4dc2-a3e6-7c7de633b383_%EC%A7%B1%EA%B5%AC%EB%BF%8C.jpg",
        userName: "sangchuman",
        commentId: 3,
        commentContent: "장미랑 거베라입니다!!",
        isMe: false,
      },
      {
        userId: 4,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/2d148ab3-d47c-4613-82f3-b76b454d0832_%EC%9D%B4%EC%83%81%ED%95%B4%EC%94%A8.png",
        userName: "sunny",
        commentId: 4,
        commentContent:
          "색깔 조합 이뿌네요 긴 댓글은 어떻게 되나요? 이것보다 더 긴 댓글은 어떻게 보여지나요? 어디까지 가는지 한번 볼까? 자신있어?",
        isMe: false,
      },
      {
        userId: 2,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/01a3ce7b-7e99-48cb-b38a-f8426eb821c1_%EC%95%A0%EA%B8%B0%EC%A7%B1%EA%B5%AC.jpg",
        userName: "shinjjang",
        commentId: 5,
        commentContent: "꽃 너무 이쁘네요",
        isMe: false,
      },
      {
        userId: 3,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0ce6a718-72f7-4d0c-a203-7731e1d4df3f_%EC%95%84%EA%B8%B0%EB%9A%B1%EC%9D%B4.jpg",
        userName: "odyssey36",
        commentId: 6,
        commentContent: "꽃 이름 뭔지 알 수 있을까요?",
        isMe: false,
      },
      {
        userId: 1,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0c7e7405-a032-4dc2-a3e6-7c7de633b383_%EC%A7%B1%EA%B5%AC%EB%BF%8C.jpg",
        userName: "sangchuman",
        commentId: 7,
        commentContent: "장미랑 거베라입니다!!",
        isMe: false,
      },
      {
        userId: 4,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/2d148ab3-d47c-4613-82f3-b76b454d0832_%EC%9D%B4%EC%83%81%ED%95%B4%EC%94%A8.png",
        userName: "sunny",
        commentId: 8,
        commentContent:
          "색깔 조합 이뿌네요 긴 댓글은 어떻게 되나요? 이것보다 더 긴 댓글은 어떻게 보여지나요? 어디까지 가는지 한번 볼까? 자신있어?",
        isMe: false,
      },
      {
        userId: 2,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/01a3ce7b-7e99-48cb-b38a-f8426eb821c1_%EC%95%A0%EA%B8%B0%EC%A7%B1%EA%B5%AC.jpg",
        userName: "shinjjang",
        commentId: 9,
        commentContent: "꽃 너무 이쁘네요",
        isMe: false,
      },
      {
        userId: 3,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0ce6a718-72f7-4d0c-a203-7731e1d4df3f_%EC%95%84%EA%B8%B0%EB%9A%B1%EC%9D%B4.jpg",
        userName: "odyssey36",
        commentId: 10,
        commentContent: "꽃 이름 뭔지 알 수 있을까요?",
        isMe: false,
      },
      {
        userId: 1,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0c7e7405-a032-4dc2-a3e6-7c7de633b383_%EC%A7%B1%EA%B5%AC%EB%BF%8C.jpg",
        userName: "sangchuman",
        commentId: 11,
        commentContent: "장미랑 거베라입니다!!",
        isMe: false,
      },
      {
        userId: 4,
        userImage:
          "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/2d148ab3-d47c-4613-82f3-b76b454d0832_%EC%9D%B4%EC%83%81%ED%95%B4%EC%94%A8.png",
        userName: "sunny",
        commentId: 12,
        commentContent:
          "색깔 조합 이뿌네요 긴 댓글은 어떻게 되나요? 이것보다 더 긴 댓글은 어떻게 보여지나요? 어디까지 가는지 한번 볼까? 자신있어?",
        isMe: false,
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
            <p className="text-[4px] font-sans text-font2">
              팔로워 {article.articleUser.follower} 팔로잉{" "}
              {article.articleUser.following}
            </p>
          </div>
        </div>
        <div className="dropdown dropdown-end h-full flex items-center">
          <AiOutlineMore className="text-2xl text-black cursor-pointer" />
        </div>
      </div>
      <div className="w-full aspect-square">
        <div className="carousel w-full h-full">
          {article.articleImages.map((imgSrc, idx) => {
            return (
              <div className="carousel-item relative w-full" key={idx}>
                <img src={imgSrc} className="object-cover" />
              </div>
            );
          })}
        </div>
      </div>
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
              <div className="inline">
                <AiOutlineHeart className="inline text-red-600" />{" "}
                {article.likeCount >= 100 ? "99+" : article.likeCount}
              </div>
              <div
                className="inline hover:text-font2"
                onClick={() => setIsOpen(true)}
              >
                <AiOutlineComment className="inline ml-2" />{" "}
                {article.commentCount >= 100 ? "99+" : article.commentCount}
              </div>
            </div>
            <div className="text-sm">{article.articleDate}</div>
          </div>
        </div>
        <hr />
        <div className="p-4 text-black">{article.articleContent}</div>
        <div
          className="h-14 p-4 hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-row justify-between items-center">
            <div>댓글 {article.commentCount}</div>
            <AiOutlineUp className="text-xl" />
          </div>

          <div></div>
        </div>
        <CommentDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loginUserImg={loginUserImg}
        >
          {article.comments.map((comment) => (
            <CommentItem
              userName={comment.userName}
              commentContent={comment.commentContent}
              userImage={comment.userImage}
              key={comment.commentId}
            />
          ))}
        </CommentDrawer>
      </div>
      <div className="h-14"></div>
    </div>
  );
}

export default ArticleDetail;
