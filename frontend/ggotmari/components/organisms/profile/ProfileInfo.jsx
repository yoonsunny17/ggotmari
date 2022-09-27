import { BsShare } from "react-icons/bs";
import { useRouter } from "next/router";

function ProfileInfo({ user, isMe }) {
  // 로그인했고, 방문한 페이지의 url과 username이 같은 경우를 찾기 위해
  const router = useRouter();

  // 클립보드에 URL 복사하기
  const copyURL = async () => {
    const url = window.location.href;
    // console.log(url);
    await navigator.clipboard.writeText(url);
    alert("프로필이 복사되었습니다.");
  };

  return (
    <div className="profile-head grid grid-cols-2">
      {/* 좌측 */}
      <div className="profile-img col-span-auto flex justify-center">
        <div className="img-box aspect-square w-3/5 my-6">
          <img
            src={user.userImage}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      {/* 우측 */}
      <div className="profile-info col-span-1 grid content-center">
        <div className="profile-info-box">
          <div className="box-username font-sans font-bold flex flex-start my-1">
            {/* {username} */}
            <span className="mr-3 text-font1">{user.userName}</span>
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
              팔로우 {user.followingCount} | 팔로워 {user.followerCount}
            </span>
          </div>
          {/* Link */}
          {isMe ? (
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
          ) : !isMe && user.isFollow ? (
            <div className="box-btns font-sansultralight text-xs my-0.5 w-1/5">
              <button className="btn-follow bg-main p-1 rounded-md text-font3 hover:bg-sub1 hover:transition-all w-full">
                팔로잉
              </button>
            </div>
          ) : !isMe && !user.isFollow ? (
            <div className="box-btns font-sansultralight text-xs my-0.5 w-1/5">
              <button className="btn-follow bg-sub1 p-1 rounded-md text-font3 hover:bg-main hover:transition-all w-full">
                팔로우
              </button>
            </div>
          ) : null}
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
