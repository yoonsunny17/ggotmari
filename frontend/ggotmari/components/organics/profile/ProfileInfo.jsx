import YJ from "../../../assets/YJ.png";
import { BsShare } from "react-icons/bs";
import { useRouter } from "next/router";

function ProfileInfo({
  username,
  numFollowing,
  numFollower,
  isFollowing,
  isLoggedIn,
  profileImg,
}) {
  // 로그인했고, 방문한 페이지의 url과 username이 같은 경우를 찾기 위해
  const router = useRouter().query.username;
  return (
    <div className="profile-head grid grid-cols-2">
      {/* 좌측 */}
      <div className="profile-img col-span-auto flex justify-center">
        <div className="img-box aspect-square w-3/5 my-6">
          <img
            src={YJ.src}
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
            <span className="mr-3">YJBaby132</span>
            {/* onClick */}
            <span className="grid content-center">
              <BsShare className="icon-share" />
            </span>
          </div>
          {/* onClick */}
          {/* numFollow */}
          <div className="box-follow-info font-sans text-xs text-font2 my-0.5">
            팔로우 10 | 팔로워 15
          </div>
          {/* Link */}
          {isLoggedIn && username === router ? (
            <div className="box-btns font-sans text-xs text-sub2 underline my-0.5">
              프로필 수정
            </div>
          ) : isLoggedIn && isFollowing ? (
            <div className="box-btns font-sans text-xs my-0.5">
              <button>팔로잉</button>
            </div>
          ) : isLoggedIn ? (
            <div className="box-btns font-sans text-xs my-0.5">
              <button className="btn-follow bg-sub1 p-1 rounded-md text-font3 hover:bg-main hover:transition-all">
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
