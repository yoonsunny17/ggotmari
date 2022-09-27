import { useRouter } from "next/router";
import { follow } from "../../../api/profile";

function FollowUser({
  item,
  followInfo,
  setFollowInfo,
  showList,
  setShowList,
  toShow,
}) {
  const router = useRouter();

  console.log(item.isFollowing);

  const success = () => {
    const newFollowInfo = { ...followInfo };
    // console.log(newFollowInfo);
    // console.log(followInfo);
    const newShowList = [...showList];
    // console.log(newShowList);
    // console.log(showList);
    // followInfo 바꿔주기
    if (toShow) {
      for (const follower of newFollowInfo.followers) {
        if (follower === item) {
          follower.isFollowing = !follower.isFollowing;
          console.log(follower);
          console.log(item);
          setFollowInfo(newFollowInfo);
        }
      }
      for (const follower of newShowList.followers) {
        if (follower === item) {
          follower.isFollowing = !follower.isFollowing;
          setShowList(newShowList);
        }
      }
    } else {
      for (const follower of newFollowInfo.followers) {
        if (follower === item) {
          follower.isFollowing = !follower.isFollowing;
          setFollowInfo(newFollowInfo);
        }
      }
      for (const follower of newShowList.followers) {
        if (follower === item) {
          follower.isFollowing = !follower.isFollowing;
          setShowList(newShowList);
        }
      }
    }
  };

  const fail = (err) => console.log(err);

  const onClickFollow = () => {
    const credential = {
      isFollow: !item.isFollowing,
      userName: item.userName,
    };
    console.log(credential);
    follow(credential, success, fail);
  };

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
              <button
                onClick={onClickFollow}
                className="following-btn cursor-pointer w-full bg-font2 text-white py-1 rounded-md hover:bg-main"
              >
                팔로잉
              </button>
            </div>
          ) : (
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
