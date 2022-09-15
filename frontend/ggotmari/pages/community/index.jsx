import StoryItem from "../../UI/molecules/community/storyItem";
import { AiOutlineSearch } from "react-icons/ai";

export default function Community() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <div className="font-maru text-main text-xl my-5">
          우리들의 꽃 이야기
        </div>
        <div className="form-control bg-font3 w-5/6 h-7 rounded-md mb-5">
          <label className="input-group h-full items-center px-3">
            <AiOutlineSearch />
            <input
              type="text"
              placeholder="꽃 이야기 찾기"
              className="input bg-font3 w-full h-full text-xs"
            />
          </label>
        </div>
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
