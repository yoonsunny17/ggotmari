function CollectionImage({ flowerImage, kindName }) {
  return (
    <>
      <div className="aspect-square flower-img-box">
        <img
          src={flowerImage}
          alt={`${kindName} 꽃 이미지 입니다.`}
          className="flower-img w-full h-full rounded-md"
        />
      </div>
      <div className="flower-title">{kindName}</div>
    </>
  );
}

export default CollectionImage;
