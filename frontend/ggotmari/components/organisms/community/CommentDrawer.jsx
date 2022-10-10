import { useRef, useState } from "react";

import ProfileImg from "../../atoms/common/ProfileImg";
import CommentItem from "../../molecules/community/CommentItem";

import {
  getArticleDetail,
  postArticleComment,
  editComment,
  deleteComment,
} from "../../../api/community";

import { IoIosArrowDown } from "react-icons/io";

function CommentDrawer({
  commentList,
  articleId,
  isOpen,
  setIsOpen,
  loginUserImg,
  setComments,
  setCommentCount,
}) {
  const commentRef = useRef();
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment) {
      if (isEdit) {
        await editComment(
          articleId,
          { commentId: commentId, commentContent: comment },
          (res) => {
            setComment("");
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        await postArticleComment(
          articleId,
          comment,
          (res) => {
            setComment("");
          },
          (err) => {
            console.log(err);
          }
        );
      }

      await getArticleDetail(
        articleId,
        (res) => {
          setComments(res.data.comments);
          setCommentCount(res.data.commentCount);
        },
        (err) => {
          console.log(err);
        }
      );

      setIsEdit(false);
    }
  };

  const handleEditClick = (commentId, commentContent) => {
    setCommentId(commentId);
    setComment(commentContent);
    setIsEdit(true);
    commentRef.current.focus();
  };

  const handleDeleteClick = async (commentId) => {
    await deleteComment(
      articleId,
      commentId,
      (res) => {
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

    await getArticleDetail(
      articleId,
      (res) => {
        setComments(res.data.comments);
        setCommentCount(res.data.commentCount);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div
      className={
        "fixed overflow-hidden w-screen z-10 inset-0 transform ease-in-out" +
        (isOpen
          ? "transition-opacity opacity-100 duration-500 translate-y-0"
          : "transition-all delay-500 opacity-0 translate-y-full")
      }
    >
      <div
        className={
          "h-full bg-white bottom-0 absolute w-full duration-500 ease-in-out transition-all transform rounded-t-xl overflow-hidden" +
          (isOpen ? " translate-y-0 " : " translate-y-full ")
        }
      >
        <div className="relative w-full pb-14 flex flex-col justify-between space-y-2 overflow-auto h-full">
          <div>
            <div
              className="flex flex-row justify-between items-center p-4 hover:bg-gray-100 sticky top-0 bg-white"
              onClick={() => {
                setIsOpen(false);
                setComment("");
                setIsEdit(false);
              }}
            >
              <div className="font-bold text-lg text-black">댓글</div>
              <IoIosArrowDown className="text-xl" />
            </div>
            <div className="flex flex-col px-3">
              {commentList.map((comment) => (
                <CommentItem
                  userName={comment.userName}
                  commentContent={comment.commentContent}
                  userImage={comment.userImage}
                  key={comment.commentId}
                  isMe={comment.isMe}
                  handleDeleteClick={() => handleDeleteClick(comment.commentId)}
                  handleEditClick={() =>
                    handleEditClick(comment.commentId, comment.commentContent)
                  }
                />
              ))}
            </div>
            <div className="h-14"></div>
          </div>
          <div>
            <div className="fixed bottom-14 bg-white flex space-x-3 justify-around w-screen px-3 py-2 items-center">
              <div className="h-9">
                <ProfileImg imgSrc={loginUserImg} />
              </div>
              <div className="grow font-sans">
                <input
                  type="text"
                  placeholder="댓글을 입력하세요"
                  className="input bg-white w-full focus:outline-none text-font2 text-sm px-0"
                  onChange={handleCommentChange}
                  value={comment}
                  ref={commentRef}
                />
              </div>
              <p
                className="rounded-md bg-main px-2 py-1 text-white font-sans text-sm"
                onClick={handleCommentSubmit}
              >
                {isEdit ? "수정" : "등록"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentDrawer;
