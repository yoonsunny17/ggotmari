import { useRouter } from "next/router";
import ProfileCollection from "../../../components/organics/profile/ProfileCollection";
import ProfileInfo from "../../../components/organics/profile/ProfileInfo";
import ProfileNavBar from "../../../components/organics/profile/ProfileNavBar";

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
