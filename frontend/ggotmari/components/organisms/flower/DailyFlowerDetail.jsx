function DailyFlowerDetail({
  info: { flowerName, flowerLanguage, flowerLuck, imgUrl },
}) {
  return (
    <div>
      <img
        className="w-full h-full aspect-square object-cover"
        src={imgUrl}
        alt="flower luck"
      />
      <div className="my-10 text-center font-maru text-font1">
        <span className="font-bold">{flowerName}</span>의 꽃말은 <br />
        <span className="font-bold ml-1">{flowerLanguage}</span>
        입니다.
        <br />
        <div className="mt-5 px-6">{flowerLuck}</div>
      </div>
    </div>
  );
}

export default DailyFlowerDetail;
