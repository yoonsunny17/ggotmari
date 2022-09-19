import { useRouter } from "next/router";
import { useState } from "react";
import ProfileInfo from "../../../components/organisms/profile/ProfileInfo";
import ProfileNavBar from "../../../components/organisms/profile/ProfileNavBar";
import YJ from "../../../assets/YJ.png";
import LikeImage from "../../../components/atoms/profile/LikeImage";

export default function Like() {
  const [likeItems, setLikeItems] = useState([
    { articleId: 1, articleImage: YJ.src, userName: "comKingYJ", likes: 100 },
    { articleId: 2, articleImage: YJ.src, userName: "comKingYJ", likes: 10 },
    { articleId: 3, articleImage: YJ.src, userName: "comKingYJ", likes: 100 },
    { articleId: 4, articleImage: YJ.src, userName: "comKingYJ", likes: 1 },
    { articleId: 5, articleImage: YJ.src, userName: "comKingYJ", likes: 100 },
    { articleId: 6, articleImage: YJ.src, userName: "comKingYJ", likes: 1 },
    { articleId: 7, articleImage: YJ.src, userName: "comKingYJ", likes: 100 },
    { articleId: 8, articleImage: YJ.src, userName: "comKingYJ", likes: 100 },
    { articleId: 9, articleImage: YJ.src, userName: "comKingYJ", likes: 100 },
    { articleId: 10, articleImage: YJ.src, userName: "comKingYJ", likes: 100 },
    { articleId: 11, articleImage: YJ.src, userName: "comKingYJ", likes: 100 },
  ]);
  return (
    <>
      <div className="profile">
        <ProfileInfo />
        <ProfileNavBar />
        {/* 하단 */}
      </div>
      <div className="content grid grid-cols-3 mx-3">
        {likeItems.map((item) => {
          return (
            <LikeImage
              articleId={item.articleId}
              articleImage={item.articleImage}
              userName={item.userName}
              likes={item.likes}
            />
          );
        })}
      </div>
    </>
  );
}
