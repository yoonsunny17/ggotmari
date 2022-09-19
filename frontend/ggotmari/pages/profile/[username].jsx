import { itMatchesOne } from "daisyui/src/lib/postcss-prefixer/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import StoryImage from "../../components/atoms/profile/StoryImage";
import ProfileInfo from "../../components/organisms/profile/ProfileInfo";
import ProfileNavBar from "../../components/organisms/profile/ProfileNavBar";
import YJ from "../../assets/YJ.png";

export default function Profile() {
  const router = useRouter();
  const [storyItems, setStoryItems] = useState([
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
  ]);
  return (
    <>
      <div className="profile">
        <ProfileInfo />
        <ProfileNavBar />
        {/* 하단 */}
      </div>
      <div className="content grid grid-cols-3 mx-3">
        {storyItems.map((item, index) => {
          return <StoryImage key={index} url={item.url} title={item.title} />;
        })}
      </div>
    </>
  );
}
