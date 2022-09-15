import StoryItem from "../../components/molecules/community/storyItem";
import SearchBar from "../../components/atoms/common/SearchBar";

export default function Community() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <div className="font-maru text-main text-xl my-5">
          우리들의 꽃 이야기
        </div>
        <SearchBar placeholder={"꽃 이야기 찾기"} />
      </div>
      <div>
        <div className="tabs">
          <a className="tab tab-sm tab-bordered text-black text-xs font-sans tab-active">
            전체
          </a>
          <a className="tab tab-sm tab-bordered text-black text-xs font-sans">
            팔로잉
          </a>
          <a className="tab tab-sm tab-bordered text-black text-xs font-sans">
            인기글
          </a>
        </div>
      </div>
      <div className="p-4">
        <StoryItem />
        <StoryItem />
        <StoryItem />
      </div>
    </div>
  );
}
