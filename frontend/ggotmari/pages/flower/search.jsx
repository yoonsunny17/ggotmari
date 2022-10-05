import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

import Header from "../../components/atoms/common/Header";
import SearchBar from "../../components/atoms/common/SearchBar";

import defaultImage from "../../assets/profile/collection/noFlowerImg.jpg";

import { getSearchFlower } from "../../api/flower";
import FlowerCard from "../../components/molecules/flower/FlowerCard";
import EasterEgg from "./easterEgg";

function SearchFlowerList() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [flowerList, setFlowerList] = useState([]);

  const getSearchedList = () => {
    if (searchKeyword) {
      getSearchFlower(
        searchKeyword,
        (res) => {
          setFlowerList(res.data.flowers);
          setKeyword(searchKeyword);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  return (
    <div className="flex flex-col w-screen">
      <Head>
        <title>Flower Search | GGOTMARI</title>
        <meta property="og:title" content="Flower Search" key="Flower Search" />
        <meta name="description" content="Search All Flowers" />
      </Head>
      <Header text="꽃 사전" />
      <div className="font-sans text-font1 flex justify-center mb-4">
        <SearchBar
          placeholder={"꽃을 검색해 보세요"}
          onChange={(e) => setSearchKeyword(e.target.value)}
          searchTerm={searchKeyword}
          handleEnterEvent={getSearchedList}
        />
      </div>
      <hr />
      <div className="flex items-end justify-between px-9 py-4">
        <div className="font-gangwon text-xl">
          {keyword ? `{ ${keyword} } 검색 결과` : ""}
        </div>
        <div className="">
          <select className="text-xs select select-sm w-fit max-w-xs focus:outline-none bg-font3 border-0">
            <option>가나다순</option>
            <option>스크랩순</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly items-center gap-y-1">
        {/* <div className="grid grid-cols-2 justify-items-center gap-y-1"> */}
        {flowerList.map((flower, idx) => (
          <FlowerCard
            kindImage={flower.kindImage}
            kindName={flower.kindName}
            subjectName={flower.subjectName}
            kindId={flower.kindId}
            key={idx}
          />
        ))}
        <EasterEgg keyword={keyword} />
      </div>
      {!flowerList.length && !keyword.length && (
        <div className="font-gangwon">
          <Image
            src={defaultImage.src}
            alt="default image"
            layout="responsive"
            width={500}
            height={500}
          />
          <p className="text-center text-xl">꽃을 검색해 보세요</p>
        </div>
      )}
    </div>
  );
}

export default SearchFlowerList;
