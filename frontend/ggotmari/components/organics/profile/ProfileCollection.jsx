import { useState } from "react";
import CollectionBtn from "../../atoms/profile/CollectionBtn";

function ProfileCollection() {
  const [tabs, setTabs] = useState([
    { category: "전체", isActive: false },
    { category: "가족", isActive: false },
    { category: "연인", isActive: false },
    { category: "친구", isActive: false },
    { category: "선생님", isActive: false },
    { category: "직장동료", isActive: false },
    { category: "기타", isActive: false },
  ]);
  console.log(tabs);
  const btnClick = (category) => {
    for (const tab of tabs) {
      if (tab.category === category && tab.category === true) {
        return;
      } else if (tab.category === category && tab.category === false) {
        let tmp = tabs;

        setTabs();
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
                onClick={btnClick(tab.category)}
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
