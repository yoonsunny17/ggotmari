import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import FlowerTag from "../../components/atoms/common/FlowerTag";

import { getFlowerKind, postArticle } from "../../api/community";

import {
  IoCameraOutline,
  IoRefreshOutline,
  IoImagesOutline,
} from "react-icons/io5";

function EditArticle() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [flowerTags, setFlowerTags] = useState({});
  const [content, setContent] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [flowerKindList, setFlowerKindList] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState();
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    getFlowerKind(
      (res) => setFlowerKindList(res.data.subjects),
      (error) => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    setFilteredList(flowerKindList);
  }, [flowerKindList]);

  useEffect(() => {
    setFilteredList(
      flowerKindList.filter((flowerKind) =>
        flowerKind.subjectName.startsWith(tagSearch),
      ),
    );
  }, [tagSearch]);

  const addFlowerTag = (flower) => {
    const newFlowerName = flower.subjectName;
    const newFlowerId = flower.subjectId;
    if (!(newFlowerId in flowerTags)) {
      setFlowerTags({ ...flowerTags, [newFlowerId]: newFlowerName });
    }
  };

  const removeFlowerTag = (flowerId) => {
    const removedTags = { ...flowerTags };
    delete removedTags[flowerId];
    setFlowerTags(removedTags);
  };

  const handleFlowerSearchChange = (e) => {
    setTagSearch(e.target.value);
  };

  const handleImgUpload = (e) => {
    const fileArr = e.target.files;
    setImageFiles(fileArr);
    const fileURLs = [];
    [...fileArr].forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = () => {
        fileURLs[idx] = reader.result;
        setImagePreviews([...fileURLs]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleArticleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const article = {
      title: title,
      content: content,
      subjects: Object.keys(flowerTags),
    };
    const json = JSON.stringify(article);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("articleInfo", blob);
    [...imageFiles].forEach((file) => formData.append("images", file));

    postArticle(
      formData,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
  };

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="w-full aspect-square bg-font3">
        {imagePreviews.length > 0 ? (
          <div className="carousel w-full aspect-square">
            {imagePreviews.map((imgSrc, idx) => (
              <div className="carousel-item relative w-full h-full" key={idx}>
                <Image src={imgSrc} className="object-cover" layout="fill" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <IoImagesOutline className="text-9xl text-sub1" />
          </div>
        )}
      </div>
      <div className="flex flex-row space-x-3 justify-center my-3">
        <label className="inline text-font2 cursor-pointer" htmlFor="flowerImg">
          <IoCameraOutline className="inline" /> 사진 첨부
        </label>
        <input
          type="file"
          accept="image/*"
          className="absolute w-0 h-0 p-0 overflow-hidden border-0"
          id="flowerImg"
          multiple
          onChange={handleImgUpload}
        />
        <p> | </p>
        <div
          className="inline text-font2 cursor-pointer"
          onClick={() => {
            setImagePreviews([]);
            setImageFiles();
          }}
        >
          <IoRefreshOutline className="inline" /> 초기화
        </div>
      </div>
      <div className="w-full p-3">
        {/* 게시글 입력폼 */}
        <form
          className="flex flex-col w-full space-y-4 font-sans text-font2"
          onSubmit={handleArticleSubmit}
        >
          {/* 글 제목 */}
          <label htmlFor="articleTitle" className="pl-2 text-sm">
            글 제목
          </label>
          <input
            type="text"
            id="articleTitle"
            className="shadow-md w-full text-sm focus:outline-none px-3 py-2"
            placeholder="제목을 입력하세요"
            onFocus={() => setDropDownOpen(false)}
            onChange={handleTitleChange}
          />
          {/* 꽃 태그 */}
          <label htmlFor="flowerTags" className="pl-2 text-sm">
            꽃 태그
          </label>
          <div className="w-full shadow-md">
            {/* 추가된 꽃 태그 컨테이너 */}
            <div>
              <div className="flex flex-row flex-wrap px-5 py-3 text-sub1 text-sm">
                {Object.keys(flowerTags).length > 0
                  ? Object.keys(flowerTags).map((flowerId) => (
                      <FlowerTag
                        flowerName={flowerTags[flowerId]}
                        key={flowerId}
                        isRemovable={true}
                        onClick={() => removeFlowerTag(flowerId)}
                      />
                    ))
                  : "추가된 꽃 태그가 없습니다"}
              </div>
              <hr />
            </div>
            {/* 꽃 검색창 */}
            <input
              type="text"
              className="w-full text-sm focus:outline-none p-3"
              placeholder="꽃을 검색하세요"
              onClick={() => setDropDownOpen(true)}
              onChange={handleFlowerSearchChange}
            />
            <hr />
            <div
              className={
                "max-h-32 z-10 overflow-auto " +
                (dropDownOpen ? "relative" : "hidden")
              }
            >
              {/* 꽃 드롭다운 */}
              <div className="">
                {filteredList.map((flower, idx) => (
                  <div
                    className="p-2 font-sans hover:bg-font3"
                    onClick={() => addFlowerTag(flower)}
                    key={idx}
                  >
                    {flower.subjectName}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 게시글 내용 */}
          <label htmlFor="articleContent" className="pl-2 text-sm">
            내용
          </label>
          <textarea
            id="articleContent"
            rows="5"
            className="shadow-md w-full text-sm focus:outline-none p-3"
            placeholder="내용을 입력하세요"
            onFocus={() => setDropDownOpen(false)}
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <input
            type="submit"
            className="bg-main text-font3 py-3 leading-normal rounded-lg"
            value="글 등록하기"
          />
        </form>
      </div>
      <div className="h-14"></div>
    </div>
  );
}

export default EditArticle;
