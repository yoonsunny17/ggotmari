import { useEffect, useState } from "react";
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

  const [collectionItems, setCollectionItems] = useState([
    {
      flowerImage: "",
      subjectId: "",
      kindId: "",
      kindName: "",
    },
  ]);

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
        setCollectionItems();
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
  console.log(likeFlowers);
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
      <div className="colletion-items grid grid-cols-3 mt-3 mb-14">
        {collectionItems ? (
          collectionItems.map((item, index) => {
            return (
              <div className="collection-item p-1.5 text-xs" key={index}>
                <CollectionImage
                  flowerImage={item.flowerImage}
                  kindId={item.kindId}
                  kindName={item.kindName}
                />
              </div>
            );
          })
        ) : (
          <div className="col-span-3 flex justify-center">
            <div className="content-box w-full">
              <div className="img-box flex justify-center">
                <img src={noFlower.src} alt="조회할 꽃이 없음" />
              </div>
              <div className="text-box flex justify-center font-gangwon text-font4">
                <span>컬렉션에 추가한 꽃이 없습니다</span>
              </div>
            </div>
          </div>
        )}
        {/* {collectionItems.map((item, index) => {
          return (
            <div className="collection-item p-1.5 text-xs" key={index}>
              <CollectionImage
                flowerImage={item.flowerImage}
                kindName={item.kindName}
              />
            </div>
          );
        })} */}
      </div>
    </>
  );
}

export default ProfileCollection;
