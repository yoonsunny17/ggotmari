import { BsGrid3X3, BsBookmark, BsHeart } from "react-icons/bs";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

function ProfileNavBar() {
  const router = useRouter();

  return (
    <div>
      <div className="profile-nav flex justify-evenly mt-4">
        {/* 최초 페이지 */}
        {router.pathname === "/profile/[username]" ? (
          <div className="story w-full flex justify-center border-b-2 border-b-main pb-4">
            <Link href={`/profile/${router.query.username}`}>
              <a className="w-2/5 text-main hover:cursor-pointer">
                <BsGrid3X3 className="w-full" />
              </a>
            </Link>
          </div>
        ) : (
          <div className="story w-full flex justify-center border-b border-b-font2 pb-4">
            <Link href={`/profile/${router.query.username}`}>
              <a className="w-2/5 hover:border-b-sub1 transition-all hover:cursor-pointer flex justify-center">
                <BsGrid3X3 className="w-full" />
              </a>
            </Link>
          </div>
        )}
        {/* 컬렉션 탭 활성화 여부 */}
        {router.pathname === "/profile/collection/[username]" ? (
          <div className="collection w-full flex justify-center border-b-2 border-b-main pb-4">
            <Link href={`/profile/collection/${router.query.username}`}>
              <a className="w-2/5 text-main hover:cursor-pointer">
                <BsBookmark className="w-full" />
              </a>
            </Link>
          </div>
        ) : (
          <div className="collection w-full flex justify-center border-b border-b-font2 pb-4">
            <Link href={`/profile/collection/${router.query.username}`}>
              <a className="w-2/5 hover:text-sub1 transition-all hover:cursor-pointer">
                <BsBookmark className="w-full" />
              </a>
            </Link>
          </div>
        )}
        {/* 좋아요 탭 활성화 여부 */}
        {router.pathname === "/profile/like/[username]" ? (
          <div className="like w-full flex justify-center border-b-2 border-b-main pb-4">
            <Link href={`/profile/like/${router.query.username}`}>
              <a className="w-2/5 text-main hover:cursor-pointer">
                <BsHeart className="w-full" />
              </a>
            </Link>
          </div>
        ) : (
          <div className="like w-full flex justify-center border-b border-b-font2 pb-4">
            <Link href={`/profile/like/${router.query.username}`}>
              <a className="w-2/5 hover:border-b-sub1 transition-all hover:cursor-pointer">
                <BsHeart className="w-full" />
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="about mt-4 mx-4 mb-2 text-lg">
        {router.pathname === "/profile/[username]" ? (
          <p>전체 이야기</p>
        ) : router.pathname === "/profile/collection/[username]" ? (
          <p>꽃 컬렉션</p>
        ) : (
          <p>좋아하는 이야기</p>
        )}
      </div>
    </div>
  );
}

export default ProfileNavBar;
