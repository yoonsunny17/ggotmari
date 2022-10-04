import { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";

import { postLetterRecomm } from "../../api/recommend";

import Image from "next/image";
import noFlower from "../../assets/profile/collection/noFlowerImg.jpg";
import flowerLoading from "../../assets/flower/flower.gif";

function WriteLetter() {
  const router = useRouter();
  // console.log(router.query.ocrLetter);

  const ocrLetter = router.query.ocrLetter;
  // console.log(ocrLetter);

  const [letter, setLetter] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState("");

  const [subjectName, setSubjectName] = useState("");
  const [subjectLanguage, setSubjectLanguage] = useState("");
  const [kindImage, setKindImage] = useState("");

  useEffect(() => {
    setLetter(ocrLetter);
  }, []);
  const handleWrite = (e) => {
    setLetter(e.target.value);
    console.log(letter);
  };

  const handleFrom = (e) => {
    setFrom(e.target.value);
    console.log(from);
  };

  const handleTo = (e) => {
    setTo(e.target.value);
    console.log(to);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log(selected);
  };

  const [clickBtn, setClickBtn] = useState(false);

  const handleLetterSubmit = (e) => {
    e.preventDefault();
    setClickBtn((current) => !current);

    const formData = new FormData();
    const content = {
      from: from,
      content: letter,
      to: to,
      selected: selected,
    };
    const json = JSON.stringify(content);
    formData.append("content", json);

    console.log(formData), console.log(json);
    postLetterRecomm(
      // formData,
      json,
      (res) => {
        console.log(res);
        // console.log(content);
        setSubjectName(res.data.subjectName);
        setSubjectLanguage(res.data.subjectLanguage);
        setKindImage(res.data.kindImage);
        // router.push(`/recommend/letter`);
      },
      (err) => {
        console.log(err);
        router.push(`/recommend/notFound`);
      }
    );
  };

  // const languageArr = subjectLanguage.split("/");
  // console.log(languageArr);
  const SplitText = ({ text }) => {
    return (
      <p>
        {text.split("/").map((txt) => (
          <p key={`${subjectName} : ` + txt}>
            {txt}
            <br />
          </p>
        ))}
      </p>
    );
  };

  console.log(subjectLanguage.replaceAll("/", "\n"));

  const replacedText = subjectLanguage.replaceAll("/", "\n");

  // const replacedText = () => {
  //   subjectLanguage.replaceAll
  // }

  return (
    <div className="flex flex-col mb-40">
      {/* <Header text={"꽃에 담은 편지"} /> */}

      {/* 편지 작성하기 */}
      {!clickBtn ? (
        <div>
          <div className="h-28">
            {/* <img
          className="opacity-80 h-full w-full object-cover object-bottom"
          src="https://images.unsplash.com/photo-1594320207823-405209d4a92b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
          alt=""
        /> */}
            <Image
              src="https://images.unsplash.com/photo-1594320207823-405209d4a92b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
              alt=""
              layout="responsive"
              width={500}
              height={150}
              objectFit="cover"
              objectPosition="bottom"
              className="opacity-80"
              priority
            />
          </div>
          <form onSubmit={handleLetterSubmit} className="font-sans mt-2">
            <div>
              <div className="mt-4 ml-8">
                <span className="text-font1">FROM. </span>
                <input
                  onChange={handleFrom}
                  className="focus:outline-none"
                  type="text"
                  placeholder="보내는 사람"
                />
              </div>
              <div className="flex justify-center mt-3 font-sans">
                <textarea
                  rows="9"
                  className="textarea bg-white w-5/6 shadow-md focus:outline-none resize-none focus:shadow-sub1 color-delay"
                  placeholder="회원님의 마음을 담아 편지를 써주세요."
                  onChange={handleWrite}
                  maxLength="180"
                  value={letter}
                  // value={ocrLetter === undefined ? undefined : ocrLetter}
                ></textarea>
              </div>
              <div className="mt-4 ml-8">
                <span className="text-font1">TO. </span>
                <input
                  onChange={handleTo}
                  className="focus:outline-none"
                  type="text"
                  placeholder="받는 사람"
                />
                <div className="mt-1.5 text-xs text-font4">
                  <label htmlFor="">나와의 관계: </label>
                  <select
                    className="pr-1 focus:outline-none"
                    onChange={handleSelect}
                    value={selected}
                  >
                    {relationCategory.map((selected, idx) => (
                      <option value={selected.category} key={idx}>
                        {selected.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                // onClick={handleClickBtn}
                type="submit"
                // className="mt-7 font-gangwon bg-sub1 rounded-md w-52 py-2 pt-2.5 pb-1.5 text-font3"
                className="bg-sub1 text-font3 w-52 py-2 pt-2.5 rounded-md"
              >
                꽃 추천 받기
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="">
          {subjectName.length === 0 && subjectLanguage.length === 0 && (
            <div>
              <Image
                src={flowerLoading.src}
                alt={subjectName}
                width={500}
                height={500}
                layout="responsive"
                objectFit="cover"
                priority
              />
              <div className="text-lg text-center mt-6 font-gangwon">
                잠시만 기다려 주세요
              </div>
            </div>
          )}
          {subjectName.length > 0 && subjectLanguage.length > 0 && (
            <div className="font-gangwon">
              <div className="relative">
                <div className="absolute z-10 text-lg text-font3 mx-6 mt-6">
                  <span className="">{from ? "From." + " " + from : from}</span>
                  {/* From. {from} */}
                  <br />
                  <span className="">{letter}</span>
                  <br />
                  <span className="">
                    {to ? "To. 나의 " + selected + ", " + to : to}
                  </span>
                  {/* To. 나의 {selected}, {to} */}
                  <br />
                </div>
                <Image
                  src={kindImage.length ? kindImage : noFlower.src}
                  alt={subjectName}
                  width={500}
                  height={500}
                  layout="responsive"
                  objectFit="cover"
                  priority
                  className="brightness-[0.65] opacity-[0.85]"
                />
              </div>
              <div className="my-6 mx-4 text-center text-font2">
                <div>
                  <span className="text-lg text-font1">{subjectName}</span>의
                  꽃말은
                </div>
                <div className="whitespace-pre-line">
                  <span className="text-font1">{replacedText}</span> 입니다
                </div>
                <br />
                <div className="text-center">
                  {subjectName}을 통해 편지에 담은 마음을 <br /> 함께 전달하는
                  건 어떨까요?
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center mt-6 font-sans">
            <button
              onClick={() => {
                setClickBtn(false);
                router.push("/recommend/letter");
                window.location.reload();
              }}
              type="submit"
              // className="mt-7 font-gangwon bg-sub1 rounded-md w-52 py-2 pt-2.5 pb-1.5 text-font3"
              className="text-font2 w-52 py-2 pt-2.5 rounded-md text-sm"
            >
              <p className="underline underline-offset-4 hover:text-font1">
                다시 추천 받기
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const relationCategory = [
  { category: "선택해 주세요" },
  { category: "가족" },
  { category: "연인" },
  { category: "친구" },
  { category: "선생님" },
  { category: "직장동료" },
  { category: "기타" },
];

export default WriteLetter;
