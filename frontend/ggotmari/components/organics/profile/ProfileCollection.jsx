import { useState } from "react";
import CollectionBtn from "../../atoms/profile/CollectionBtn";

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
  // console.log(tabs);
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
      <div className="tabs grid grid-cols-4 mx-3">
        {tabs.map((tab) => {
          // console.log(tab);
          return (
            <div key={tab.category} className="col-span-1 p-1">
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
    </>
  );
}

export default ProfileCollection;
