import { useRouter } from "next/router";
import StoryImg from "../../components/atoms/profile/StoryImg";
import ProfileInfo from "../../components/organisms/profile/ProfileInfo";
import ProfileNavBar from "../../components/organisms/profile/ProfileNavBar";

export default function Profile() {
  const router = useRouter();
  return (
    <>
      <div className="profile">
        <ProfileInfo />
        <ProfileNavBar />
        {/* 하단 */}
      </div>
      <div className="content grid grid-cols-3 mx-3">
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
        <StoryImg />
      </div>
    </>
  );
}
