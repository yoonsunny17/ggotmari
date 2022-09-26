import { useRouter } from "next/router";
import ProfileFollowList from "../../../components/organisms/profile/ProfileFollowList";

function ProfileFollow() {
  const router = useRouter().query.username;
  return (
    <>
      <div className="username-box my-6">
        <span className="username mx-6 font-sansbold text-font1 text-lg">
          {router} 님
        </span>
      </div>
      <ProfileFollowList />
    </>
  );
}

export default ProfileFollow;
