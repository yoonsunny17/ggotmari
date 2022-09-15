import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";

export default function StoryItem() {
  return (
    <div className="flex flex-row my-2 h-32">
      <div className="flex basis-1/3 flex-col items-center justify-center">
        <div>
          <div className="h-24 w-24 bg-main overflow-hidden rounded-lg">
            <img src="flowerImage.jpg" />
          </div>
          <div className="text-xs text-font2 w-full">@sangchuman</div>
        </div>
      </div>
      <div className="basis-2/3 flex flex-col justify-center px-2">
        <p className="text-sm font-sans font-medium text-black">
          여자친구한테 칭찬받았어요
        </p>
        <div>
          <p className="text-[4px] bg-extra2 inline-block rounded-sm px-1 mr-1 text-white">
            #거베라
          </p>
          <p className="text-[4px] bg-extra2 inline-block rounded-sm px-1 mr-1 text-white">
            #거베라
          </p>
        </div>
        <div className="h-12 text-xs text-font2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisseplacerat vel quam ...
        </div>
        <div className="text-xs w-full">
          <AiFillHeart className="inline text-red-600" /> 15{" "}
          <AiOutlineComment className="inline" /> 5
        </div>
      </div>
    </div>
  );
}
