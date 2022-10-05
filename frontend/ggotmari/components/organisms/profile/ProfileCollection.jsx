import { useEffect, useState } from "react";
import Image from "next/image";
import CollectionBtn from "../../atoms/profile/CollectionBtn";
import CollectionImage from "../../atoms/profile/CollectionImage";
import noFlower from "../../../assets/profile/collection/noFlowerImg.jpg";

function ProfileCollection({ likeFlowers }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { category: "전체" },
    { category: "가족" },
    { category: "연인" },
    { category: "친구" },
    { category: "선생님" },
    { category: "직장동료" },
    { category: "기타" },
  ];

  const [collectionItems, setCollectionItems] = useState([]);

  const onClickTab = (index) => {
    setActiveTab(index);
    let arr = [];
    for (let likeFlower of likeFlowers) {
      arr.push(likeFlower.tag);
      // console.log(arr);
      if (arr.includes(tabs[index].category)) {
        // console.log("yes");
        if (tabs[index].category === likeFlower.tag) {
          setCollectionItems(likeFlower.flowers);
        }
      } else {
        setCollectionItems([]);
      }
    }
  };

  useEffect(() => {
    let arr = [];
    for (let likeFlower of likeFlowers) {
      arr.push(likeFlower.tag);
      // console.log(arr);
      if (arr.includes(tabs[0].category)) {
        // console.log("yes");
        if (tabs[0].category === likeFlower.tag) {
          setCollectionItems(likeFlower.flowers);
        }
      } else {
        setCollectionItems();
      }
    }
  }, []);

  return (
    <>
      {/* 탭들 */}
      <div className="tabs grid grid-cols-4 mx-4">
        {tabs.map((tab, index) => {
          // console.log(tab);
          return (
            <div key={tab.category} className="col-span-1 p-0.5">
              <CollectionBtn
                category={tab.category}
                activeTab={activeTab}
                index={index}
                onClick={() => {
                  // console.log("clicked");
                  onClickTab(index);
                }}
              />
            </div>
          );
        })}
      </div>
      {/* 사진 및 내용들 */}
      <div className="colletion-items grid grid-cols-3 mt-3 mb-14 mx-4">
        {collectionItems.length > 0 ? (
          collectionItems.map((item, index) => {
            return (
              <div className="collection-item px-1 py-0.5 text-xs" key={index}>
                <CollectionImage
                  flowerImage={item.flowerImage}
                  kindId={item.kindId}
                  kindName={item.kindName}
                  subjectId={item.subjectId}
                />
              </div>
            );
          })
        ) : (
          <div className="col-span-3 flex justify-center mx-10">
            <div className="content-box w-full">
              {/* <div className="img-box flex justify-center my-10">
                <img
                  src={noFlower.src}
                  alt="조회할 꽃이 없습니다."
                  className="w-2/3"
                />
              </div> */}
              <div className="img-box-1 my-10 w-full relative">
                <div className="img-box-2 aspect-square flex justify-center">
                  <Image
                    src={noFlower.src}
                    alt="조회할 꽃이 없음"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              </div>
              <div className="text-box flex justify-center font-gangwon text-font4">
                <span>컬렉션에 추가한 꽃이 없습니다</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileCollection;
