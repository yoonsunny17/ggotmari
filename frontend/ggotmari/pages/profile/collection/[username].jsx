import { useRouter } from "next/router";
import ProfileCollection from "../../../components/organisms/profile/ProfileCollection";
import ProfileInfo from "../../../components/organisms/profile/ProfileInfo";
import ProfileNavBar from "../../../components/organisms/profile/ProfileNavBar";

export default function Collection() {
  const router = useRouter();
  return (
    <div className="profile">
      <ProfileInfo />
      <ProfileNavBar />
      {/* 하단 */}
      <ProfileCollection />
    </div>
  );
}
