import { useRouter } from "next/router";
import ProfileInfo from "../../../components/organics/profile/ProfileInfo";
import ProfileNavBar from "../../../components/organics/profile/ProfileNavBar";

export default function Like() {
  const router = useRouter();
  return (
    <div className="profile">
      <ProfileInfo />
      <ProfileNavBar />
      {/* 하단 */}
    </div>
  );
}
