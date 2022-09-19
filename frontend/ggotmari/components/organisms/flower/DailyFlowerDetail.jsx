function DailyFlowerDetail({
  info: { flowerName, flowerLanguage, flowerLuck, imgUrl },
}) {
  return (
    <div>
      <img
        className="aspect-square object-cover"
        src={imgUrl}
        alt="flower luck"
      />
      <div className="my-10 text-center font-maru">
        <span className="font-bold">{flowerName}</span>
        의 꽃말은 <br />
        {flowerLanguage}
        입니다.
        <br />
        <span>{flowerLuck}</span>
      </div>
    </div>
  );
}

export default DailyFlowerDetail;
