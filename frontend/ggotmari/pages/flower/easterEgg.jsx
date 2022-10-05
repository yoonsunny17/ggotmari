import { useEffect, useState } from "react";
import FlowerCard from "../../components/molecules/flower/FlowerCard";

// FIXME: 사진 고칠거야!!!
// TODO: 각자 상세 페이지 클릭하면 자기소개 써두면 좋을듯??
function EasterEgg({ keyword }) {
  const easterEggArr = [
    "문요성",
    "이지수",
    "전윤선",
    "지용현",
    "박영준",
    "정윤영",
    "꽃마리",
  ];

  const ggotmari = [
    {
      kindId: 1,
      kindName: "문요성",
      subjectId: 1,
      subjectName: "꽃마리",
      kindImage:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      kindId: 2,
      kindName: "이지수",
      subjectId: 1,
      subjectName: "꽃마리",
      kindImage:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=694&q=80",
    },
    {
      kindId: 3,
      kindName: "전윤선",
      subjectId: 1,
      subjectName: "꽃마리",
      kindImage:
        "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
    {
      kindId: 4,
      kindName: "지용현",
      subjectId: 1,
      subjectName: "꽃마리",
      kindImage:
        "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
    {
      kindId: 5,
      kindName: "박영준",
      subjectId: 1,
      subjectName: "꽃마리",
      kindImage:
        "https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    },
    {
      kindId: 6,
      kindName: "정윤영",
      subjectId: 1,
      subjectName: "꽃마리",
      kindImage:
        "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    },
  ];
  const [idx, setIdx] = useState();

  useEffect(() => {
    setIdx(easterEggArr.indexOf(keyword));
  });

  return (
    idx >= 0 && (
      <>
        {idx == 6
          ? ggotmari.map((member, idx) => {
              return <FlowerCard flower={member} key={idx} />;
            })
          : null}
        {idx >= 0 && idx < 6 ? <FlowerCard flower={ggotmari[idx]} /> : null}
      </>
    )
  );
}

export default EasterEgg;
