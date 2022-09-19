import YJ from "../../../assets/YJ.png";

function CollectionImage({ url, title }) {
  return (
    <>
      <div className="aspect-square flower-img-box">
        <img
          src={YJ.src}
          alt={`${title} 꽃 이미지 입니다.`}
          className="flower-img w-full h-full rounded-md"
        />
      </div>
      <div className="flower-title">{title}</div>
    </>
  );
}

export default CollectionImage;
