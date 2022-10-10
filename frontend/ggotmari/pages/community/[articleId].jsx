import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Swal from "sweetalert2/dist/sweetalert2.js";

import ProfileImg from "../../components/atoms/common/ProfileImg";
import FlowerTag from "../../components/atoms/common/FlowerTag";
import CommentDrawer from "../../components/organisms/community/CommentDrawer";

import {
  getArticleDetail,
  postArticleLike,
  deleteArticle,
} from "../../api/community";

import { AiOutlineMore, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

const deleteConfirmAlert = Swal.mixin({
  title: `<p className="text-base">정말 삭제하시겠습니까?</p>`,
  showDenyButton: true,
  showCancelButton: true,
  showConfirmButton: false,
  denyButtonText: `삭제`,
  cancelButtonText: `취소`,
});

function ArticleDetail() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLike, setIsLike] = useState();
  const [likeCount, setLikeCount] = useState();
  const [commentCount, setCommentCount] = useState();
  const [comments, setComments] = useState();
  const [article, setArticle] = useState();

  useEffect(() => {
    getArticleDetail(
      router.query.articleId,
      (res) => {
        const article = res.data;
        delete article.status;
        delete article.message;
        article.articleId = router.query.articleId;
        setArticle(article);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (article != undefined) {
      setIsLike(article.isLike);
      setLikeCount(article.likeCount);
      setCommentCount(article.commentCount);
      setComments(article.comments);
    }
  }, [article]);

  const handleFlowerTagClick = (flowerTag) => {
    router.push({
      pathname: `/flower/${flowerTag.subjectId}`,
      query: { kindId: flowerTag.kindId },
    });
  };

  const handleUserClick = () => {
    router.push(`/profile/${article.user.userName}`);
  };

  const handleLikeClick = async () => {
    await postArticleLike(
      router.query.articleId,
      !isLike,
      () => {
        setLikeCount(isLike ? likeCount - 1 : likeCount + 1);
        setIsLike(!isLike);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleEditClick = () => {
    router.push(
      {
        pathname: "/community/edit",
        query: {
          title: article.articleTitle,
          content: article.articleContent,
          images: JSON.stringify(article.articleImages),
          tags: JSON.stringify(article.tags),
          articleId: article.articleId,
          mode: "edit",
        },
      },
      "/community"
    );
  };

  const handleDeleteClick = () => {
    deleteConfirmAlert.fire().then(async (result) => {
      if (result.isDenied) {
        await deleteArticle(
          router.query.articleId,
          (res) => {
            Swal.fire({
              icon: "success",
              title: "삭제되었습니다",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/community");
              }
            });
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "삭제에 실패하였습니다",
            });
          }
        );
      }
    });
  };

  return comments == undefined ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-5">
        <svg
          className="animate-spin h-10 w-10 text-main"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={4}
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962"
          ></path>
        </svg>
        <div className="font-sans text-xl text-main">게시글 불러오는 중...</div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col">
      <Head>
        <title>STORY | GGOTMARI</title>
        <meta property="og:title" content="Article Detail" key="edit" />
        <meta name="description" content="User can read article." />
      </Head>
      <div className="flex flex-row justify-between items-center h-20 px-4">
        <div
          className="flex flex-row h-2/3 items-center grow hover:bg-font3"
          onClick={handleUserClick}
        >
          <div className="h-full aspect-square">
            <ProfileImg imgSrc={article.user.userImage} />
          </div>
          <div className="ml-4">
            <p className="text-base font-sans text-black">
              {article.user.userName}
            </p>
            <p className="text-sm font-sans text- text-font2">
              팔로워 {article.user.follower} 팔로잉 {article.user.following}
            </p>
          </div>
        </div>
        {article.user.isMe ? (
          <div
            className="h-full flex items-center"
            onClick={() => setIsClicked(!isClicked)}
          >
            <AiOutlineMore className="dropdown-toggle text-2xl text-black cursor-pointer" />
          </div>
        ) : null}
      </div>
      <div className="w-full aspect-square">
        <div
          className={
            "absolute z-10 top -6 right-0 bg-white font-sans text-black " +
            (isClicked ? "" : "hidden")
          }
        >
          <div
            className="px-5 py-3 pr-10 hover:bg-font3"
            onClick={handleEditClick}
          >
            수정하기
          </div>
          <div
            className="px-5 py-3 pr-10 hover:bg-font3"
            onClick={handleDeleteClick}
          >
            삭제하기
          </div>
        </div>
        <div className="carousel w-full h-full">
          {article.articleImages.map((imgSrc, idx) => {
            return (
              <div className="carousel-item relative w-full" key={idx}>
                <Image
                  src={imgSrc}
                  className="object-cover"
                  layout="fill"
                  priority
                />
                {article.articleImages.length >= 2 ? (
                  <div className="absolute right-3 bottom-3 font-sanslight text-xs text-white bg-font4/40 rounded-md px-2 py-0.5">
                    {idx + 1} / {article.articleImages.length}
                  </div>
                ) : null}
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
                onClick={() => handleFlowerTagClick(flowerTag)}
              />
            ))}
          </div>
          <div className="flex flex-row justify-between items-end font-sans text-sm">
            <div>
              <div className="inline" onClick={handleLikeClick}>
                {isLike ? (
                  <AiFillHeart size={16} className="inline text-red-600" />
                ) : (
                  <AiOutlineHeart size={16} className="inline text-red-600" />
                )}{" "}
                {likeCount >= 100 ? "99+" : likeCount}
              </div>
              <div
                className="inline hover:text-font2"
                onClick={() => setIsOpen(true)}
              >
                <BsChatDots size={14} className="inline ml-2" />{" "}
                {commentCount >= 100 ? "99+" : commentCount}
              </div>
            </div>
            <div className="text-sm">
              {article.articleDate.substring(0, 10)}
            </div>
          </div>
        </div>
        <hr />
        <div className="font-sans p-4 text-font1 whitespace-pre-wrap">
          {article.articleContent}
        </div>
        <div
          className="h-14 p-4 hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-row font-sans text-font2 justify-between items-center">
            <div>댓글 {commentCount}</div>
            <IoIosArrowUp className="text-xl" />
          </div>

          <div></div>
        </div>
        <CommentDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loginUserImg={article.loginUserImage}
          articleId={router.query.articleId}
          commentList={comments}
          setComments={setComments}
          setCommentCount={setCommentCount}
        />
      </div>
      <div className="h-14"></div>
    </div>
  );
}

export default ArticleDetail;
