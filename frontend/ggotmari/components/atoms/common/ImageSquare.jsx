function ImageSquare({ imageSrc }) {
  return (
    <div className="w-full aspect-square opbj bg-main overflow-hidden rounded-lg">
      <img className="w-full h-full object-cover" src={imageSrc} />
    </div>
  );
}

export default ImageSquare;
