import { BsGrid3X3, BsBookmark, BsHeart } from "react-icons/bs";
import { useRouter } from "next/dist/client/router";

function ProfileNavBar({ activeTab, onActiveTab }) {
  return (
    <div>
      <div className="profile-nav flex justify-evenly mt-4">
        {/* 최초 페이지 */}
        {activeTab === 0 ? (
          <div className="story w-full flex justify-center border-b-2 border-b-main pb-4">
            <span className="w-2/5 text-main hover:cursor-pointer">
              <BsGrid3X3 className="w-full" />
            </span>
          </div>
        ) : (
          <div className="story w-full flex justify-center border-b border-b-[E1E1E1] pb-4">
            <button
              className="w-2/5 hover:border-b-sub1 transition-all hover:cursor-pointer flex justify-center"
              onClick={() => onActiveTab(0)}
            >
              <BsGrid3X3 className="w-full" />
            </button>
          </div>
        )}
        {/* 컬렉션 탭 활성화 여부 */}
        {activeTab === 1 ? (
          <div className="collection w-full flex justify-center border-b-2 border-b-main pb-4">
            <span className="w-2/5 text-main hover:cursor-pointer">
              <BsBookmark className="w-full" />
            </span>
          </div>
        ) : (
          <div className="collection w-full flex justify-center border-b border-b-[E1E1E1] pb-4">
            <button
              className="w-2/5 hover:text-sub1 transition-all hover:cursor-pointer"
              onClick={() => onActiveTab(1)}
            >
              <BsBookmark className="w-full" />
            </button>
          </div>
        )}
        {/* 좋아요 탭 활성화 여부 */}
        {activeTab === 2 ? (
          <div className="like w-full flex justify-center border-b-2 border-b-main pb-4">
            <span className="w-2/5 text-main hover:cursor-pointer">
              <BsHeart className="w-full" />
            </span>
          </div>
        ) : (
          <div className="like w-full flex justify-center border-b border-b-[E1E1E1] pb-4">
            <button
              className="w-2/5 hover:border-b-sub1 transition-all hover:cursor-pointer"
              onClick={() => onActiveTab(2)}
            >
              <BsHeart className="w-full" />
            </button>
          </div>
        )}
      </div>
      <div className="about mt-4 mx-4 mb-2 text-lg text-font1 font-maru font-medium">
        {activeTab === 0 ? (
          <p>전체 이야기</p>
        ) : activeTab === 1 ? (
          <p>꽃 컬렉션</p>
        ) : (
          <p>좋아하는 이야기</p>
        )}
      </div>
    </div>
  );
}

export default ProfileNavBar;
