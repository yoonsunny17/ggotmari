import { useRouter } from "next/router";
import { GrGallery, GrPowerReset } from "react-icons/gr";

function EditArticle() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-square bg-main"></div>
      <div className="flex flex-row justify-center">
        <div className="inline text-font2">
          <GrGallery className="inline text-font2" />
          사진 첨부
        </div>
        <p> | </p>
        <div className="inline text-font2">
          <GrPowerReset className="inline text-font2" />
          초기화
        </div>
      </div>
      <div className="w-full p-3">
        <form className="flex flex-col w-full space-y-2 font-sans text-font2">
          <label for="articleTitle" className="pl-2 text-sm">
            글 제목
          </label>
          <input
            type="text"
            id="articleTitle"
            className="shadow-md w-full text-sm focus:outline-none px-3 py-2"
            placeholder="제목을 입력하세요"
          />
          <label for="articleTitle" className="pl-2 text-sm">
            꽃 태그
          </label>
          <input
            type="text"
            className="shadow-md w-full text-lg focus:outline-none p-3"
          />
          <label for="articleTitle" className="pl-2 text-sm">
            내용
          </label>
          <input
            type="text"
            className="shadow-md w-full text-sm focus:outline-none p-3 h-40"
            placeholder="내용을 입력하세요"
          />
          <input type="submit" />
        </form>
      </div>
      <div className="h-14"></div>
    </div>
  );
}

export default EditArticle;
