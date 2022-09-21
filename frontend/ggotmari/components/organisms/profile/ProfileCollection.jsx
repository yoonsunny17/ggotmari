import { useState } from "react";
import CollectionBtn from "../../atoms/profile/CollectionBtn";
import CollectionImage from "../../atoms/profile/CollectionImage";
import YJ from "../../../assets/YJ.png";

function ProfileCollection() {
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

  const onClickTab = (index) => {
    setActiveTab(index);
  };

  const [collectionItems, setCollectionItems] = useState([
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
  ]);

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
      <div className="colletion-items grid grid-cols-3 mt-3 mx-3">
        {collectionItems.map((item, index) => {
          return (
            <div className="collection-item p-1.5 text-xs" key={index}>
              <CollectionImage url={item.url} title={item.title} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProfileCollection;
