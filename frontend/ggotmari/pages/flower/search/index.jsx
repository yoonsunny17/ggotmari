import Header from "../../../components/atoms/common/Header";
import SearchBar from "../../../components/atoms/common/SearchBar";

function AllFlowerList() {
  return (
    <div>
      <Header text={"꽃 찾기"} />
      <div className="font-sans flex justify-center mb-4">
        <SearchBar placeholder={"꽃 찾기"} />
      </div>
      <hr />
      <div className="flex items-end justify-between">
        <div className="font-gangwon text-xl pt-6 pl-8">전체 꽃</div>
        <div className="px-8">
          <select className="text-xs select select-bordered select-sm w-fit max-w-xs focus:outline-none">
            <option>가나다순</option>
            <option>스크랩순</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default AllFlowerList;
