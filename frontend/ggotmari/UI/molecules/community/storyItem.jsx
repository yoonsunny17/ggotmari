import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";

export default function StoryItem() {
  return (
    <div className="flex flex-row my-2 h-32">
      <div className="flex basis-1/3 flex-col items-center justify-center">
        <div>
          <div className="h-24 w-24 bg-main overflow-hidden rounded-lg">
            <img src="flowerImage.jpg" />
          </div>
          <div className="text-xs w-full">@sangchuman</div>
        </div>
      </div>
      <div className="basis-2/3 flex flex-col justify-center px-2">
        <div className="h-7 text-sm text-black">여자친구한테 칭찬받았어요</div>
        <div className="h-5">
          <div className="h-full text-xs bg-extra2 inline-block rounded-sm px-1 mx-1 text-white">
            #거베라
          </div>
          <div className="h-full text-xs bg-extra2 inline-block rounded-sm px-1 text-white">
            #거베라
          </div>
        </div>
        <div className="h-12 text-xs">
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
