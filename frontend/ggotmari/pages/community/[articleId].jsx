import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import ProfileImg from "../../components/atoms/common/ProfileImg";
import FlowerTag from "../../components/atoms/common/FlowerTag";
import CommentDrawer from "../../components/organisms/community/CommentDrawer";
import CommentItem from "../../components/molecules/community/CommentItem";

import { getArticleDetail, getArticleIds } from "../../api/community";

import {
  AiOutlineMore,
  AiOutlineHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";

export async function getStaticPaths() {
  var paths = [];

  await getArticleIds(
    (res) => {
      paths = res.data.articlesId.map((articleId) => ({
        params: {
          articleId: articleId.toString(),
        },
      }));
    },
    (err) => {
      console.log(err);
    }
  );

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  var article = {};
  await getArticleDetail(
    params.articleId,
    (res) => {
      article = { ...res.data };
      delete article.status;
      delete article.message;
    },
    (err) => {
      console.log(err);
    }
  );

  return {
    props: {
      article,
    },
  };
}

function ArticleDetail({ article }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const loginUserImg =
    "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0c7e7405-a032-4dc2-a3e6-7c7de633b383_%EC%A7%B1%EA%B5%AC%EB%BF%8C.jpg";

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center h-20 px-4">
        <div className="flex flex-row h-2/3 items-center grow">
          <div className="h-full aspect-square">
            <ProfileImg imgSrc={article.user.userImage} />
          </div>
          <div className="ml-4">
            <p className="text-base font-sans text-black">
              {article.user.userName}
            </p>
            <p className="text-sm font-sans text-font2">
              팔로워 {article.user.follower} 팔로잉 {article.user.following}
            </p>
          </div>
        </div>
        <div
          className="h-full flex items-center"
          onClick={() => setIsClicked(!isClicked)}
        >
          <AiOutlineMore className="dropdown-toggle text-2xl text-black cursor-pointer" />
        </div>
      </div>
      <div className="w-full aspect-square">
        <div
          className={
            "absolute z-10 top -6 right-0 bg-white text-black " +
            (isClicked ? "" : "hidden")
          }
        >
          <div className="px-5 py-3 pr-10 hover:bg-font3">수정하기</div>
          <div className="px-5 py-3 pr-10 hover:bg-font3">삭제하기</div>
        </div>
        <div className="carousel w-full h-full">
          {article.articleImages.map((imgSrc, idx) => {
            return (
              <div className="carousel-item relative w-full" key={idx}>
                <Image src={imgSrc} className="object-cover" layout="fill" />
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
            <IoIosArrowUp className="text-xl" />
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
