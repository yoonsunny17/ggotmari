import { BsShare } from "react-icons/bs";
import { useRouter } from "next/router";
import { follow } from "../../../api/profile";
import { useEffect } from "react";

function ProfileInfo({ userInfo, setUserInfo }) {
  // 로그인했고, 방문한 페이지의 url과 username이 같은 경우를 찾기 위해
  const router = useRouter();

  // 클립보드에 URL 복사하기
  const copyURL = async () => {
    const url = window.location.href;
    // console.log(url);
    await navigator.clipboard.writeText(url);
    alert("프로필이 복사되었습니다.");
  };

  const success = () => {
    const tempInfo = { ...userInfo };
    tempInfo.user.isFollow = !userInfo.user.isFollow;
    if (tempInfo.user.isFollow) {
      tempInfo.user.followerCount += 1;
      setUserInfo(tempInfo);
    } else {
      tempInfo.user.followerCount -= 1;
      setUserInfo(tempInfo);
    }
  };
  const fail = (err) => console.log(err);

  // 팔로우버튼 클릭
  const onClickFollow = () => {
    const credential = {
      isFollow: !userInfo.user.isFollow,
      userName: router.query.username,
    };
    // console.log(credential);
    follow(credential, success, fail);
  };

  return (
    <div className="profile-head grid grid-cols-5">
      {/* 좌측 */}
      <div className="profile-img col-span-2 flex justify-center">
        <div className="img-box aspect-square w-4/5 my-6">
          <img
            src={userInfo.user.userImage}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      {/* 우측 */}
      <div className="profile-info col-span-3 grid content-center">
        <div className="profile-info-box">
          <div className="box-username font-sans font-bold flex flex-start my-1">
            {/* {username} */}
            <span className="mr-3 text-font1">{userInfo.user.userName}</span>
            {/* onClick */}
            <span className="grid content-center">
              <BsShare
                className="icon-share cursor-pointer"
                onClick={copyURL}
              />
            </span>
          </div>
          {/* onClick */}
          {/* numFollow */}
          <div className="box-follow-info font-sansultralight text-xs text-font2 my-0.5">
            <span
              className="cursor-pointer"
              onClick={() => {
                router.push(`/profile/follow/${router.query.username}`);
              }}
            >
              팔로워 {userInfo.user.followerCount} | 팔로잉{" "}
              {userInfo.user.followingCount}
            </span>
          </div>
          {/* Link */}
          {userInfo.isMe ? (
            <div className="box-btns font-sansultralight text-xs text-sub2 underline my-0.5">
              <span
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/profile/edit/${router.query.username}`);
                }}
              >
                프로필 수정
              </span>
            </div>
          ) : userInfo.user.isFollow ? (
            <div className="box-btns font-sansultralight text-xs my-0.5 w-1/4">
              <button
                onClick={onClickFollow}
                className="btn-follow bg-main p-1 rounded-md text-white hover:bg-sub1 hover:transition-all w-full"
              >
                팔로잉
              </button>
            </div>
          ) : (
            <div className="box-btns font-sansultralight text-xs my-0.5 w-1/4">
              <button
                onClick={onClickFollow}
                className="btn-follow bg-sub1 p-1 rounded-md text-white hover:bg-main hover:transition-all w-full"
              >
                팔로우
              </button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .icon-share {
        }
      `}</style>
    </div>
  );
}

export default ProfileInfo;
