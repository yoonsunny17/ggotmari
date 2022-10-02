import Header from "../../components/atoms/common/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { postLetterRecomm } from "../../api/recommend";

import Image from "next/image";

function WriteLetter() {
  const router = useRouter();

  const [letter, setLetter] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState("");

  const [subjectName, setSubjectName] = useState("");
  const [subjectLanguage, setSubjectLanguage] = useState("");

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

    // const formData = new FormData();
    // const json = JSON.stringify(content);
    // formData.append("content", new Blob([json], { type: "application/json" }));

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
        router.push(`/recommend/letter`);
      },
      (err) => {
        console.log(err);
        router.push(`/recommend/notFound`);
      }
    );
  };

  return (
    <div className="flex flex-col mb-40">
      <Header text={"꽃에 담은 편지"} />
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
        />
      </div>

      {/* 편지 작성하기 */}
      {!clickBtn ? (
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
                className="textarea bg-white w-5/6 shadow-md focus:outline-none resize-none focus:shadow-sub1"
                placeholder="회원님의 마음을 담아 편지를 써주세요."
                onChange={handleWrite}
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
            {/* {!clickBtn && (
            <button
              onClick={handleClickBtn}
              type="submit"
              className="bg-sub1 text-font3 w-52 py-2 pt-2.5 rounded-md"
            >
              꽃 추천 받기
            </button>
          )} */}
          </div>
        </form>
      ) : (
        <div>
          <div>{to + letter + from + selected}</div>
          {subjectName.length == 0 && subjectLanguage.length == 0 && (
            <div>loading...</div>
          )}
          <div>{subjectName}</div>
          <div>{subjectLanguage}</div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setClickBtn(false);
                router.push("/recommend/letter");
                window.location.reload();
              }}
              type="submit"
              // className="mt-7 font-gangwon bg-sub1 rounded-md w-52 py-2 pt-2.5 pb-1.5 text-font3"
              className="bg-sub1 text-font3 w-52 py-2 pt-2.5 rounded-md"
            >
              다시 추천 받기
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
