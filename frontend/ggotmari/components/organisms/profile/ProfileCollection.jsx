import { useState } from "react";
import CollectionBtn from "../../atoms/profile/CollectionBtn";
import CollectionImage from "../../atoms/profile/CollectionImage";
import YJ from "../../../assets/YJ.png";

function ProfileCollection() {
  const [tabs, setTabs] = useState([
    { category: "전체", isActive: true },
    { category: "가족", isActive: false },
    { category: "연인", isActive: false },
    { category: "친구", isActive: false },
    { category: "선생님", isActive: false },
    { category: "직장동료", isActive: false },
    { category: "기타", isActive: false },
  ]);
  const [collectionItems, setCollectionItems] = useState([
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
    { url: YJ.src, title: "소통왕 영준" },
  ]);

  const btnClick = (category) => {
    // console.log("clicked", tabs);
    for (let i = 0; i < tabs.length; i++) {
      // console.log(tabs[i]);
      if (tabs[i].category === category && tabs[i].isActive === true) {
        return;
      } else if (tabs[i].category === category && tabs[i].isActive === false) {
        const tmp = [
          { category: "전체", isActive: false },
          { category: "가족", isActive: false },
          { category: "연인", isActive: false },
          { category: "친구", isActive: false },
          { category: "선생님", isActive: false },
          { category: "직장동료", isActive: false },
          { category: "기타", isActive: false },
        ];
        tmp[i].isActive = true;
        // console.log(tmp);
        setTabs(tmp);
      }
    }
  };

  return (
    <>
      {/* 탭들 */}
      <div className="tabs grid grid-cols-4 mx-4">
        {tabs.map((tab) => {
          // console.log(tab);
          return (
            <div key={tab.category} className="col-span-1 p-0.5">
              <CollectionBtn
                category={tab.category}
                isActive={tab.isActive}
                onClick={() => {
                  // console.log("clicked");
                  btnClick(tab.category);
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
