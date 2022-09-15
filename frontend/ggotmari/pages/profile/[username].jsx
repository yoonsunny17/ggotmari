import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  console.log(router);
  return (
    <div className="profile">
      {/* 상단 */}
      <div className="profile-head grid grid-cols-3">
        {/* 좌측 */}
        <div className="profile-img col-span-auto flex justify-center">
          <img src="YJ.png" alt="" />
        </div>
        {/* 우측 */}
        <div className="profile-info col-span-2 flex justify-center">
          왜왜왜왜
        </div>
      </div>
      {/* 하단 */}
      <div className="content">hihihi</div>
    </div>
  );
}
