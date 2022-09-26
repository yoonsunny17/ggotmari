import { useRouter } from "next/router";

function FollowUser({ item }) {
  const router = useRouter();
  // console.log(item);
  return (
    <>
      <div className="follow-user mx-10 grid grid-cols-6 my-3">
        <div className="image-box aspect-square col-span-1">
          <img
            src={item.userImage}
            alt={`${item.userName}님의 프로필 사진입니다.`}
            className="w-full h-full object-cover rounded-full cursor-pointer"
            onClick={() => {
              router.push(`/profile/${item.userName}`);
            }}
          />
        </div>
        <div className="username-box col-span-4 pl-3 grid items-center">
          <span
            className="username cursor-pointer text-font1 font-sanslight text-sm w-fit"
            onClick={() => {
              router.push(`/profile/${item.userName}`);
            }}
          >
            {item.userName}
          </span>
        </div>
        <div className="follow-btn col-span-1 grid items-center font-sansultralight text-xs">
          {item.isFollowing ? (
            <div>
              <button className="following-btn cursor-pointer w-full bg-font2 text-white py-1 rounded-md hover:bg-main">
                팔로잉
              </button>
            </div>
          ) : (
            <div>
              <button className="following-btn cursor-pointer w-full bg-sub1 text-white py-1 rounded-md hover:bg-main">
                팔로우
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FollowUser;
