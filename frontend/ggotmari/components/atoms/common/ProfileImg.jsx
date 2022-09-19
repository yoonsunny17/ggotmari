function ProfileImg({ imgSrc }) {
  return (
    <div className="h-full aspect-square overflow-hidden rounded-full">
      <img className="object-cover h-full" src={imgSrc}></img>
    </div>
  );
}

export default ProfileImg;
