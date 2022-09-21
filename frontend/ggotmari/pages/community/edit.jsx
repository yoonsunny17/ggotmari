import { useRouter } from "next/router";
import { useState } from "react";
import { IoCameraOutline, IoRefreshOutline } from "react-icons/io5";
import FlowerTag from "../../components/atoms/common/FlowerTag";

function EditArticle() {
  const router = useRouter();
  const [flowerTags, setFlowerTags] = useState([
    "장미",
    "거베라",
    "코스모스",
    "아크라시아",
  ]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-square bg-main"></div>
      <div className="flex flex-row space-x-3 justify-center my-3">
        <div className="inline text-font2 cursor-pointer">
          <IoCameraOutline className="inline" /> 사진 첨부
        </div>
        <p> | </p>
        <div className="inline text-font2 cursor-pointer">
          <IoRefreshOutline className="inline" /> 초기화
        </div>
      </div>
      <div className="w-full p-3">
        <form className="flex flex-col w-full space-y-4 font-sans text-font2">
          <label htmlFor="articleTitle" className="pl-2 text-sm">
            글 제목
          </label>
          <input
            type="text"
            id="articleTitle"
            className="shadow-md w-full text-sm focus:outline-none px-3 py-2"
            placeholder="제목을 입력하세요"
          />
          <label htmlFor="flowerTags" className="pl-2 text-sm">
            꽃 태그
          </label>
          <div className="w-full shadow-md">
            <div>
              <div className="flex flex-row flex-wrap px-5 py-3">
                {flowerTags?.map((tag) => (
                  <FlowerTag flowerName={tag} key={tag} isRemovable={true} />
                ))}
              </div>
              <hr />
            </div>

            <input
              type="text"
              className="w-full text-sm focus:outline-none p-3"
              placeholder="꽃을 검색하세요"
            />
          </div>
          <label htmlFor="articleContent" className="pl-2 text-sm">
            내용
          </label>
          <textarea
            id="articleContent"
            rows="5"
            className="shadow-md w-full text-sm focus:outline-none p-3"
            placeholder="내용을 입력하세요"
          ></textarea>
          <input type="submit" />
        </form>
      </div>
      <div className="h-14"></div>
    </div>
  );
}

export default EditArticle;
