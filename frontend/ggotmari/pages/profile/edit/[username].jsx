import YJ from "../../../assets/YJ.png";
import { AiOutlineCamera } from "react-icons/ai";

function Edit() {
  return (
    <div className="profile-edit">
      <div className="title flex justify-center">
        <span className="my-8 font-maru text-2xl text-main">프로필 수정</span>
      </div>
      <div className="image-box flex justify-center">
        <div className="w-2/5 aspect-square">
          <img
            src={YJ.src}
            alt=""
            className="image w-full h-full rounded-full"
          />
        </div>
      </div>
      <div className="image-change flex justify-center items-center my-5 text-font1 font-sanslight ">
        <span className="mr-2 text-sm">
          <AiOutlineCamera />
          사진변경
        </span>
        <span className="text-xl">|</span>
        <span className="ml-2 text-sm">초기화</span>
      </div>
    </div>
  );
}

export default Edit;
