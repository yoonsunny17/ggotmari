import ProfileImg from "../../atoms/common/ProfileImg";

function CommentItem({ userImage, userName, commentContent }) {
  return (
    <div className="flex flex-row items-start">
      <div className="h-9">
        <ProfileImg imgSrc={userImage} />
      </div>
      <div className="text-black font-bold mx-2">{userName}</div>
      <div className="text-font2">{commentContent}</div>
    </div>
  );
}

export default CommentItem;
