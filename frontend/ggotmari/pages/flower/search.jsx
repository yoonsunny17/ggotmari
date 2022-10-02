import { useState } from "react";

import Header from "../../components/atoms/common/Header";
import SearchBar from "../../components/atoms/common/SearchBar";

import { getSearchFlower } from "../../api/flower";
import FlowerCard from "../../components/molecules/flower/FlowerCard";

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
        },
      );
    }
  };

  return (
    <div className="flex flex-col w-screen">
      <Header text="꽃 찾기" />
      <div className="font-sans flex justify-center mb-4">
        <SearchBar
          placeholder={"꽃 찾기"}
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
      <div className="flex flex-wrap justify-evenly items-center">
        {flowerList.map((flower, idx) => (
          <FlowerCard
            kindImage={flower.kindImage}
            kindName={flower.kindName}
            subjectName={flower.subjectName}
            kindId={flower.kindId}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchFlowerList;
