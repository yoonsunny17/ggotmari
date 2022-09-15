import Header from "../components/atoms/common/Header";
import SearchBar from "../components/molecules/common/SearchBar";

export default function Home() {
  return (
    <div>
      {/* <div className="flex justify-center font-maru text-main text-2xl mt-3">
        꽃마리
      </div> */}
      <Header text={"꽃마리"} />
      <hr />
      <SearchBar placeholder={"꽃 찾기"} />
    </div>
  );
}
