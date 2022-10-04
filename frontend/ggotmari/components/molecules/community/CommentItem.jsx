import ProfileImg from "../../atoms/common/ProfileImg";

function CommentItem({
  userImage,
  userName,
  commentContent,
  isMe,
  handleDeleteClick,
  handleEditClick,
}) {
  return (
    <div className="flex flex-row items-start my-2.5">
      <div className="flex-none w-12">
        <ProfileImg imgSrc={userImage} />
      </div>
      <div className="grow flex flex-col space-y-1 px-4 font-sans">
        <div className="text-black text-sm flex space-x-2 items-center">
          <div>{userName}</div>
          <div className={`text-xs text-font2 ${isMe ? "" : "hidden"}`}>
            수정
          </div>
          <div
            className={`text-xs text-font2 ${isMe ? "" : "hidden"}`}
            onClick={handleDeleteClick}
          >
            삭제
          </div>
        </div>
        <div className="text-font2 text-sm">{commentContent}</div>
      </div>
    </div>
  );
}

export default CommentItem;
