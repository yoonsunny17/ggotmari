import { useRouter } from "next/router";
import { follow } from "../../../api/profile";
import Image from "next/image";

function FollowUser({ item, followInfo, setFollowInfo }) {
  const router = useRouter();

  const success = (userName) => {
    const newFollowInfo = { ...followInfo };

    for (const follower of newFollowInfo.followers) {
      if (follower.userName === userName) {
        follower.isFollowing = !follower.isFollowing;
        setFollowInfo(newFollowInfo);
      }
    }
    for (const following of newFollowInfo.followings) {
      if (following.userName === userName) {
        following.isFollowing = !following.isFollowing;
        setFollowInfo(newFollowInfo);
      }
    }
  };

  const fail = (err) => console.log(err);

  const onClickFollow = () => {
    const credential = {
      isFollow: !item.isFollowing,
      userName: item.userName,
    };
    follow(credential, success(credential.userName), fail);
  };

  return (
    <>
      <div className="follow-user mx-10 grid grid-cols-6 my-3">
        <div className="image-box aspect-square col-span-1 relative">
          {/* <img
            src={item.userImage}
            alt={`${item.userName}님의 프로필 사진입니다.`}
            className="w-full h-full object-cover rounded-full cursor-pointer"
            onClick={() => {
              router.push(`/profile/${item.userName}`);
            }}
          /> */}
          <Image
            src={item.userImage}
            alt={`${item.userName}님의 프로필 사진입니다.`}
            layout="fill"
            objectFit="cover"
            className="rounded-full cursor-pointer"
            onClick={() => {
              router.push(`/profile/${item.userName}`);
            }}
          />
        </div>
        <div className="username-box col-span-4 pl-3 grid items-center">
          <span
            className="username cursor-pointer text-font1 font-sans text-sm w-fit"
            onClick={() => {
              router.push(`/profile/${item.userName}`);
            }}
          >
            {item.userName}
          </span>
        </div>
        <div className="follow-btn col-span-1 grid items-center font-sanslight text-xs">
          {item.isMe && null}
          {!item.isMe && item.isFollowing && (
            <div>
              <button
                onClick={onClickFollow}
                className="following-btn cursor-pointer w-full bg-font2 text-white py-1 rounded-md hover:bg-main"
              >
                팔로잉
              </button>
            </div>
          )}
          {!item.isMe && !item.isFollowing && (
            <div>
              <button
                onClick={onClickFollow}
                className="following-btn cursor-pointer w-full bg-sub1 text-white py-1 rounded-md hover:bg-main"
              >
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
