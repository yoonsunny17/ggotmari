function ImageSquare({ imageSrc }) {
  return (
    <div className="w-full aspect-square bg-main overflow-hidden rounded-lg">
      <img src={imageSrc} />
    </div>
  );
}

export default ImageSquare;
