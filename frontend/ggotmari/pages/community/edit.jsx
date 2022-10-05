import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";
import { ArticleToast } from "../../components/atoms/common/Toast";

import FlowerTag from "../../components/atoms/common/FlowerTag";

import { editArticle, getFlowerKind, postArticle } from "../../api/community";

import {
  IoCameraOutline,
  IoRefreshOutline,
  IoImagesOutline,
} from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

function EditArticle() {
  const router = useRouter();

  const [flowerKindList, setFlowerKindList] = useState([]);
  const [title, setTitle] = useState(
    router.query.title ? router.query.title : ""
  );
  const [content, setContent] = useState(
    router.query.content ? router.query.content : ""
  );
  const [flowerTags, setFlowerTags] = useState(
    router.query.tags ? JSON.parse(router.query.tags) : []
  );
  const [imagePreviews, setImagePreviews] = useState(
    router.query.images ? JSON.parse(router.query.images) : []
  );
  const [tagSearch, setTagSearch] = useState("");
  const [flowerTagIds, setFlowerTagIds] = useState(
    router.query.tags
      ? JSON.parse(router.query.tags).map((tag) => tag.subjectId)
      : []
  );
  const [filteredList, setFilteredList] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState();
  const [tooltip, setTooltip] = useState(false);
  const timerRef = useRef();

  var isSubmit = false;

  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "top",
  //   showConfirmButton: false,
  //   timer: 3000,
  //   icon: "error",
  //   didOpen: (toast) => {
  //     toast.addEventListener("mouseenter", Swal.stopTimer);
  //     toast.addEventListener("mouseleave", Swal.resumeTimer);
  //   },
  // });

  useEffect(() => {
    getFlowerKind(
      (res) => {
        setFlowerKindList(res.data.subjects);
        setFilteredList(res.data.subjects);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    setFilteredList(
      flowerKindList.filter((flowerKind) =>
        flowerKind.subjectName.startsWith(tagSearch)
      )
    );
  }, [tagSearch]);

  const addFlowerTag = (flower) => {
    const newFlowerId = flower.subjectId;
    if (!flowerTagIds.includes(newFlowerId)) {
      setFlowerTagIds([...flowerTagIds, newFlowerId]);
      setFlowerTags([...flowerTags, flower]);
    }
    setTagSearch("");
  };

  const removeFlowerTag = (flowerId) => {
    setFlowerTags(flowerTags.filter((tag) => tag.subjectId != flowerId));
    setFlowerTagIds(flowerTagIds.filter((id) => id != flowerId));
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
    const mode = router.query.mode;

    if (!isSubmit) {
      isSubmit = true;
      // 유효성 검사
      if (imagePreviews.length == 0) {
        ArticleToast.fire({
          customClass: {
            title: "toast-title",
          },
          icon: "error",
          width: 340,
          title: "사진을 최소 1장 이상 업로드해주세요.",
        });
        isSubmit = false;
      } else if (title == "") {
        ArticleToast.fire({
          customClass: {
            title: "toast-title",
          },
          icon: "error",
          width: 340,
          title: "제목을 입력해주세요",
        });
        isSubmit = false;
      } else if (flowerTags.length == 0) {
        ArticleToast.fire({
          customClass: {
            title: "toast-title",
          },
          icon: "error",
          width: 340,
          title: "꽃 태그를 최소 1개 이상 추가해주세요",
        });
        isSubmit = false;
      } else if (content == "") {
        ArticleToast.fire({
          customClass: {
            title: "toast-title",
          },
          icon: "error",
          width: 340,
          title: "내용을 입력해주세요",
        });
        isSubmit = false;
      } else {
        const formData = new FormData();
        const article = {
          title: title,
          content: content,
          subjects: flowerTagIds,
        };
        const json = JSON.stringify(article);
        formData.append(
          "articleInfo",
          new Blob([json], { type: "application/json" })
        );

        if (imageFiles != undefined) {
          [...imageFiles].forEach((file) => formData.append("images", file));
        }

        if (mode == "write") {
          postArticle(
            formData,
            (res) => {
              router.push(`/community/${res.data.articleId}`);
            },
            (err) => {
              Toast.fire({
                title: "게시글 등록에 실패하였습니다",
              });
              isSubmit = false;
            }
          );
        } else if (mode == "edit") {
          editArticle(
            router.query.articleId,
            formData,
            (res) => {
              router.push(`/community/${res.data.articleId}`);
            },
            (err) => {
              Toast.fire({
                title: "게시글 수정에 실패하였습니다",
              });
              isSubmit = false;
            }
          );
        }
      }
    }
  };

  const handleCancleClick = () => {
    const mode = router.query.mode;
    if (mode == "write") {
      router.push("/community");
    } else if (mode == "edit") {
      router.back();
    }
  };

  function handleOnTooltip() {
    setTooltip(true);
    timerRef.current = setTimeout(() => {
      setTooltip(false);
    }, 2000);
  }

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="w-full aspect-square bg-font3">
        {imagePreviews.length > 0 ? (
          <div className="carousel w-full aspect-square">
            {imagePreviews.map((imgSrc, idx) => (
              <div className="carousel-item relative w-full h-full" key={idx}>
                <Image
                  src={imgSrc}
                  className="object-cover"
                  layout="fill"
                  priority
                />
              </div>
            ))}
          </div>
        ) : (
          <label
            className="w-full h-full flex justify-center items-center"
            htmlFor="flowerImg"
          >
            <IoImagesOutline className="text-9xl text-sub1" />
          </label>
        )}
      </div>
      <div className="flex flex-row space-x-3 justify-center my-3">
        <label
          className="inline font-sans text-font2 cursor-pointer"
          htmlFor="flowerImg"
        >
          <IoCameraOutline className="inline" /> 사진 업로드
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
          className="inline text-font2 cursor-pointer font-sans"
          onClick={() => {
            setImagePreviews([]);
            setImageFiles();
          }}
        >
          <IoRefreshOutline size={18} className="inline mb-0.5" /> 초기화
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
            className="rounded-md shadow-sm w-full text-sm focus:outline-none focus:shadow-sub1 color-delay px-3 py-2"
            placeholder="제목을 입력하세요"
            onFocus={() => setDropDownOpen(false)}
            onChange={handleTitleChange}
            value={title}
          />
          {/* 꽃 태그 */}
          <div>
            <div className="flex items-center">
              <label htmlFor="flowerTags" className="pl-2 text-sm">
                꽃 태그
              </label>
              <p className="px-1" onClick={handleOnTooltip}>
                <AiOutlineExclamationCircle size={14} />
              </p>
            </div>
            <p
              className={`${
                tooltip ? "text-font2" : "text-white"
              } text-xs ml-2 mt-0.5`}
            >
              태그를 누르면 태그가 제거됩니다
            </p>
          </div>
          <div className="w-full shadow-sm rounded-md">
            {/* 추가된 꽃 태그 컨테이너 */}
            <div>
              <div className="flex flex-row flex-wrap px-4 py-3 text-sub1 text-sm">
                {flowerTags.length > 0
                  ? flowerTags.map((flower) => (
                      <FlowerTag
                        flowerName={flower.subjectName}
                        key={flower.subjectId}
                        isRemovable={true}
                        onClick={() => removeFlowerTag(flower.subjectId)}
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
              value={tagSearch}
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
            className="shadow-sm rounded-md focus:shadow-sub1 color-delay w-full text-sm focus:outline-none p-3"
            placeholder="내용을 입력하세요"
            onFocus={() => setDropDownOpen(false)}
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <div className="flex flex-row-reverse">
            <div
              className="px-3 py-2 bg-font3 rounded-lg mx-4"
              onClick={handleCancleClick}
            >
              취소
            </div>
            <div
              className="bg-main text-font3 px-3 py-2 leading-normal rounded-lg hover:bg-sub1"
              onClick={handleArticleSubmit}
            >
              {router.query.mode == "write" ? "등록하기" : "수정하기"}
            </div>
          </div>
        </form>
      </div>
      <div className="h-14"></div>
    </div>
  );
}

export default EditArticle;
