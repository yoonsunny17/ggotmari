import FollowUser from "../../molecules/profile/FollowUser";
import SearchBar from "../../atoms/common/SearchBar";
import { useEffect, useState } from "react";

function ProfileFollowList() {
  // 여기서 서버로 통신
  // 초기값 세팅
  const [followInfo, setFollowInfo] = useState({
    follower: [],
    following: [],
  });

  // 정보를 담아줄 함수
  const fillFollowInfo = () => {
    // 요기에 통신 후 정보를 담아줄 예정
    setFollowInfo({
      follower: [
        {
          userName: "im follower",
          userImage:
            "https://photo.jtbc.joins.com/news/2015/06/18/201506182141183067.jpg",
          isFollowing: true,
        },
        {
          userName: "im follower2",
          userImage:
            "https://photo.jtbc.joins.com/news/2015/06/18/201506182141183067.jpg",
          isFollowing: false,
        },
      ],
      following: [
        {
          userName: "im following",
          userImage:
            "https://photo.jtbc.joins.com/news/2015/06/18/201506182141183067.jpg",
        },
        {
          userName: "im following2",
          userImage:
            "https://photo.jtbc.joins.com/news/2015/06/18/201506182141183067.jpg",
        },
      ],
    });
  };

  useEffect(fillFollowInfo, []);

  // 팔로우 팔로잉 온오프
  const [toShow, setToShow] = useState(true);

  const changeOn = () => {
    if (toShow) {
      setToShow(false);
    } else {
      setToShow(true);
    }
  };

  return (
    <>
      {/* 팔로워 팔로우 선택 */}
      <div className="follow-nav flex justify-center font-sanslight mb-3">
        {toShow ? (
          <>
            <div className="follower border-b-[2px] border-b-main w-1/2 text-main flex justify-center pb-1">
              <span className="cursor-pointer">팔로워</span>
            </div>
            <div className="following border-b-[0.5px] border-b-[E1E1E1] w-1/2 text-font2 flex justify-center pb-1">
              <span className="cursor-pointer" onClick={changeOn}>
                팔로잉
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="follower border-b-[0.5px] border-b-[E1E1E1] w-1/2 text-font2 flex justify-center pb-1">
              <span className="cursor-pointer" onClick={changeOn}>
                팔로워
              </span>
            </div>
            <div className="following border-b-[2px] border-b-main w-1/2 text-main flex justify-center pb-1">
              <span className="cursor-pointer">팔로잉</span>
            </div>
          </>
        )}
      </div>
      <div className="searchbar flex justify-center mb-5">
        <SearchBar placeholder={"유저 검색"} />
      </div>
      <div className="follow-list">
        {toShow
          ? followInfo.follower.map((item, index) => {
              return (
                <div className="follower" key={index}>
                  <FollowUser item={item} />
                </div>
              );
            })
          : followInfo.following.map((item, index) => {
              return (
                <div className="following" key={index}>
                  <FollowUser item={item} />
                </div>
              );
            })}
      </div>
    </>
  );
}

export default ProfileFollowList;
