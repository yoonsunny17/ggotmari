import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2/dist/sweetalert2.js";

import ProfileImg from "../../components/atoms/common/ProfileImg";
import FlowerTag from "../../components/atoms/common/FlowerTag";
import CommentDrawer from "../../components/organisms/community/CommentDrawer";

import {
  getArticleDetail,
  postArticleLike,
  deleteArticle,
} from "../../api/community";

import {
  AiOutlineMore,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

function ArticleDetail() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(false);
  const [commentCount, setCommentCount] = useState();
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState({
    user: {
      userId: 0,
      userName: "",
      userImage: "",
      follower: 0,
      following: 0,
      isFollow: false,
      isMe: false,
    },
    articleTitle: "",
    articleContent: "",
    articleImages: [],
    articleDate: "",
    tags: [],
    isLike: false,
    likeCount: 0,
    commentCount: 0,
    comments: [],
  });

  useEffect(() => {
    getArticleDetail(
      router.query.articleId,
      (res) => {
        const article = res.data;
        delete article.status;
        delete article.message;
        setArticle(article);
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);

  useEffect(() => {
    setIsLike(article.isLike);
    setLikeCount(article.likeCount);
    setComments(article.comments);
    setCommentCount(article.commentCount);
  }, [article]);

  const loginUserImg =
    "https://parsley-bucket.s3.ap-northeast-2.amazonaws.com/0c7e7405-a032-4dc2-a3e6-7c7de633b383_%EC%A7%B1%EA%B5%AC%EB%BF%8C.jpg";

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
      },
    );
  };

  const deleteConfirmAlert = Swal.mixin({
    title: `<p className="text-base">정말 삭제하시겠습니까?</p>`,
    showDenyButton: true,
    showCancelButton: true,
    showConfirmButton: false,
    denyButtonText: `삭제`,
    cancelButtonText: `취소`,
  });

  const handleEditClick = () => {};

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
          },
        );
      }
    });
  };

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
            "absolute z-10 top -6 right-0 bg-white text-black " +
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
              <div className="inline" onClick={handleLikeClick}>
                {isLike ? (
                  <AiFillHeart className="inline text-red-600" />
                ) : (
                  <AiOutlineHeart className="inline text-red-600" />
                )}{" "}
                {likeCount >= 100 ? "99+" : likeCount}
              </div>
              <div
                className="inline hover:text-font2"
                onClick={() => setIsOpen(true)}
              >
                <AiOutlineComment className="inline ml-2" />{" "}
                {commentCount >= 100 ? "99+" : commentCount}
              </div>
            </div>
            <div className="text-sm">
              {article.articleDate.substring(0, 10)}
            </div>
          </div>
        </div>
        <hr />
        <div className="p-4 text-black">{article.articleContent}</div>
        <div
          className="h-14 p-4 hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-row justify-between items-center">
            <div>댓글 {commentCount}</div>
            <IoIosArrowUp className="text-xl" />
          </div>

          <div></div>
        </div>
        <CommentDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loginUserImg={loginUserImg}
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
