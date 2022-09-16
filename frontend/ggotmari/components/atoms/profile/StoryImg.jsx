import YJ from "../../../assets/YJ.png";

function StoryImg(url, title) {
  return (
    <div className="aspect-square col-span-1 p-1.5">
      <img
        src={YJ.src}
        alt={`${title} 대표 이미지입니다.`}
        className="w-full h-full rounded-md"
      />
    </div>
  );
}

export default StoryImg;
