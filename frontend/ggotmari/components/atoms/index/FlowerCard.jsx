function FlowerCard({ info: { flowerName, imgUrl } }) {
  return (
    <div className="cursor-pointer rounded-lg aspect-square overflow-hidden relative brightness-96">
      <img
        className="w-full h-full object-cover"
        src={imgUrl}
        alt={flowerName}
      />
    </div>
  );
}

export default FlowerCard;
