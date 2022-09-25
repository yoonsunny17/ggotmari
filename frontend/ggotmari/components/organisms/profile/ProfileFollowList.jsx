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
  const [showList, setShowList] = useState([]);
  const [toShow, setToShow] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 서버에서 요청을 받아 정보를 담아줄 함수 및 useEffect
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
    setShowList([
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
    ]);
  };
  useEffect(fillFollowInfo, []);

  // 팔로우 팔로잉 정보 바뀔 때 및 처음 시작할 때 정보 채워주기
  useEffect(() => {
    if (toShow) {
      setShowList(followInfo.follower);
    } else {
      setShowList(followInfo.following);
    }
  }, [followInfo]);

  // 팔로우와 팔로잉 탭이 바뀔 때마다 showList 갈아 끼어넣기
  useEffect(() => {
    setSearchTerm("");
    if (toShow) {
      setShowList(followInfo.follower);
    } else {
      setShowList(followInfo.following);
    }
  }, [toShow]);

  // 검색어 입력시 showList 갈아 끼어넣기
  useEffect(() => {
    if (searchTerm === "") {
      if (toShow) {
        setShowList(followInfo.follower);
      } else {
        setShowList(followInfo.following);
      }
    } else {
      let arr = [];
      for (let show of showList) {
        if (show.userName.includes(searchTerm)) {
          arr.push(show);
        }
      }
      setShowList(arr);
    }
  }, [searchTerm]);

  // 팔로우 팔로잉 온오프

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
        <SearchBar
          placeholder={"유저 검색"}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className="follow-list mt-3 mb-14">
        {showList.length > 0 ? (
          showList.map((item, index) => {
            return (
              <div className="follower" key={index}>
                <FollowUser item={item} />
              </div>
            );
          })
        ) : (
          <div>nonono</div>
        )}
      </div>
    </>
  );
}

export default ProfileFollowList;
