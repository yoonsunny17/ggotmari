import ProfileImg from "../../atoms/common/ProfileImg";

function CommentItem({ userImage, userName, commentContent }) {
  return (
    <div className="flex flex-row items-start my-2">
      <div className="flex-none w-9">
        <ProfileImg imgSrc={userImage} />
      </div>
      <div className="grow flex flex-col space-y-1 px-2 font-sans">
        <div className="text-black text-sm">{userName}</div>
        <div className="text-font2 text-sm">{commentContent}</div>
      </div>
    </div>
  );
}

export default CommentItem;
