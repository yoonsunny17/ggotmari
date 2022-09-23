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
      <div className="my-10 text-center font-gangwon text-font1 text-md">
        {flowerName}의 꽃말은 <br />
        &apos;{flowerLanguage}&apos; 입니다.
        <br />
        <div className="mt-5 px-6">{flowerLuck}</div>
      </div>
    </div>
  );
}

export default DailyFlowerDetail;
