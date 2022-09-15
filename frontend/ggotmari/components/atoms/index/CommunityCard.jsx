import { IoMdHeart } from "react-icons/io";

function CommunityCard({ info: { username, imgUrl, likeNumbs } }) {
  return (
    <div className="">
      <div className="cursor-pointer rounded-lg aspect-square shadow overflow-hidden relative">
        <img
          src={imgUrl}
          alt="communityCard"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <p className="text-font2">@{username}</p>
        <p className="flex">
          <IoMdHeart size={15} color="red" />{" "}
          {likeNumbs >= 100 ? (
            "99+"
          ) : (
            <span className="text-font1">{likeNumbs}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default CommunityCard;
