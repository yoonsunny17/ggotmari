import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProfileCollection from "../../../components/organisms/profile/ProfileCollection";
import ProfileInfo from "../../../components/organisms/profile/ProfileInfo";
import ProfileNavBar from "../../../components/organisms/profile/ProfileNavBar";

export default function Collection() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    status: "",
    message: "",
    isMe: "",
    user: {
      userName: "",
      followingCount: "",
      followerCount: "",
      userImage: "",
      isFollow: "",
    },
    articles: [
      {
        articleId: "",
        articleImage: "",
      },
    ],
    likeFlowers: [
      {
        tag: "",
        flowers: [
          {
            flowerImage: "",
            subjectId: "",
            kindId: "",
            kindName: "",
          },
        ],
      },
    ],
    likeArticles: [
      {
        articleId: "",
        articleImage: "",
        userName: "",
        likes: "",
        articleTitle: "",
      },
    ],
  });

  // 서버 통신 짤 코드

  const getInfo = () => {
    const info = {
      status: 200,
      message: "회원 정보 조회 성공",
      isMe: true,
      user: {
        userName: "TheYJBaby",
        followingCount: 20,
        followerCount: 2000,
        userImage:
          "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
        isFollow: true,
      },
      articles: [
        {
          articleId: 1,
          articleTitle: "제니1",
          articleImage:
            "https://images.chosun.com/resizer/fo-0AnY_2j3QZ2DbEuxxVc0VSZQ=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/6Y6TZ5MYRVGFDNVP6FAEPRLIKQ.jpg",
        },
        {
          articleId: 2,
          articleTitle: "제니1",
          articleImage:
            "https://images.chosun.com/resizer/fo-0AnY_2j3QZ2DbEuxxVc0VSZQ=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/6Y6TZ5MYRVGFDNVP6FAEPRLIKQ.jpg",
        },
        {
          articleId: 3,
          articleTitle: "제니1",
          articleImage:
            "https://images.chosun.com/resizer/fo-0AnY_2j3QZ2DbEuxxVc0VSZQ=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/6Y6TZ5MYRVGFDNVP6FAEPRLIKQ.jpg",
        },
        {
          articleId: 4,
          articleTitle: "제니1",
          articleImage:
            "https://images.chosun.com/resizer/fo-0AnY_2j3QZ2DbEuxxVc0VSZQ=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/6Y6TZ5MYRVGFDNVP6FAEPRLIKQ.jpg",
        },
      ],
      likeFlowers: [
        {
          tag: "가족",
          flowers: [
            {
              flowerImage:
                "https://file2.nocutnews.co.kr/newsroom/image/2021/06/13/202106131759472028_0.jpg",
              subjectId: 1,
              kindId: 1,
              kindName: "BTS",
            },
            {
              flowerImage:
                "https://file2.nocutnews.co.kr/newsroom/image/2021/06/13/202106131759472028_0.jpg",
              subjectId: 2,
              kindId: 2,
              kindName: "BTS2",
            },
          ],
        },
        {
          tag: "친구",
          flowers: [
            {
              flowerImage:
                "https://file2.nocutnews.co.kr/newsroom/image/2021/06/13/202106131759472028_0.jpg",
              subjectId: 1,
              kindId: 1,
              kindName: "BTS",
            },
            {
              flowerImage:
                "https://file2.nocutnews.co.kr/newsroom/image/2021/06/13/202106131759472028_0.jpg",
              subjectId: 2,
              kindId: 2,
              kindName: "BTS2",
            },
          ],
        },
      ],
      likeArticles: [
        {
          articleId: 1,
          articleImage:
            "https://photo.jtbc.joins.com/news/2015/06/18/201506182141183067.jpg",
          userName: "GD",
          likes: 132,
          articleTitle: "꽃",
        },
        {
          articleId: 1,
          articleImage:
            "https://photo.jtbc.joins.com/news/2015/06/18/201506182141183067.jpg",
          userName: "GD",
          likes: 132,
          articleTitle: "꽃",
        },
        {
          articleId: 1,
          articleImage:
            "https://photo.jtbc.joins.com/news/2015/06/18/201506182141183067.jpg",
          userName: "GD",
          likes: 132,
          articleTitle: "꽃",
        },
        {
          articleId: 1,
          articleImage:
            "https://photo.jtbc.joins.com/news/2015/06/18/201506182141183067.jpg",
          userName: "GD",
          likes: 132,
          articleTitle: "꽃",
        },
      ],
    };
    setUserInfo(info);
  };

  useEffect(getInfo, []);

  return (
    <div className="profile">
      <ProfileInfo user={userInfo.user} isMe={userInfo.isMe} />
      <ProfileNavBar />
      {/* 하단 */}
      <ProfileCollection likeFlowers={userInfo.likeFlowers} />
    </div>
  );
}
