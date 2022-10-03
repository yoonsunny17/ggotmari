import FlowerCard from "../../components/molecules/flower/FlowerCard";

function EasterEgg(props) {
  console.log("easterEgg");
  console.log(props);
  return (
    <div className="grid grid-cols-2 gap-x-6">
      {props.keyword === "꽃마리" &&
        ggotmari.map((flower, idx) => {
          console.log(flower);
          return (
            <FlowerCard
              kindImage={flower.kindImage}
              kindName={flower.kindName}
              subjectName={flower.subjectName}
              kindId={flower.kindId}
              key={idx}
            />
          );
        })}
      {props.keyword === "문요성" && (
        <FlowerCard
          kindImage={ggotmari[0].kindImage}
          kindName={ggotmari[0].kindName}
          subjectName={ggotmari[0].subjectName}
          kindId={ggotmari[0].kindId}
        />
      )}
      {props.keyword === "이지수" && (
        <FlowerCard
          kindImage={ggotmari[1].kindImage}
          kindName={ggotmari[1].kindName}
          subjectName={ggotmari[1].subjectName}
          kindId={ggotmari[1].kindId}
        />
      )}
      {props.keyword === "전윤선" && (
        <FlowerCard
          kindImage={ggotmari[2].kindImage}
          kindName={ggotmari[2].kindName}
          subjectName={ggotmari[2].subjectName}
          kindId={ggotmari[2].kindId}
        />
      )}
      {props.keyword === "지용현" && (
        <FlowerCard
          kindImage={ggotmari[3].kindImage}
          kindName={ggotmari[3].kindName}
          subjectName={ggotmari[3].subjectName}
          kindId={ggotmari[3].kindId}
        />
      )}
      {props.keyword === "박영준" && (
        <FlowerCard
          kindImage={ggotmari[4].kindImage}
          kindName={ggotmari[4].kindName}
          subjectName={ggotmari[4].subjectName}
          kindId={ggotmari[4].kindId}
        />
      )}
      {props.keyword === "정윤영" && (
        <FlowerCard
          kindImage={ggotmari[5].kindImage}
          kindName={ggotmari[5].kindName}
          subjectName={ggotmari[5].subjectName}
          kindId={ggotmari[5].kindId}
        />
      )}
    </div>
  );
}

const ggotmari = [
  {
    kindId: 1,
    kindName: "문요성",
    subjectName: "꽃마리",
    kindImage:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    kindId: 2,
    kindName: "이지수",
    subjectName: "꽃마리",
    kindImage:
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=694&q=80",
  },
  {
    kindId: 3,
    kindName: "전윤선",
    subjectName: "꽃마리",
    kindImage:
      "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    kindId: 4,
    kindName: "지용현",
    subjectName: "꽃마리",
    kindImage:
      "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    kindId: 5,
    kindName: "박영준",
    subjectName: "꽃마리",
    kindImage:
      "https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  },
  {
    kindId: 6,
    kindName: "정윤영",
    subjectName: "꽃마리",
    kindImage:
      "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
  },
];

export default EasterEgg;
