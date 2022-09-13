import { useState } from "react";

function Radios() {
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);
  const [btn4, setBtn4] = useState(false);
  const [btn5, setBtn5] = useState(false);
  const [btn6, setBtn6] = useState(false);

  const onClick = (num) => {
    setBtn`${num}`((current) => !current)
    for (let i = 1; i <= 6; i++) {
      if (i !== num) {
        setBtn`${i}` = false
      }
    }
  }

  return (
    <div>
      <button onClick={onClick(1)} style={btn1 ? { color: "black" } : { color: "gray" }}>
        가족
      </button>
      <button onClick={onClick(2)} style={btn2 ? { color: "black" } : { color: "gray" }}>
        연인
      </button>
      <button onClick={onClick(3)} style={btn3 ? { color: "black" } : { color: "gray" }}>
        직장동료
      </button>
      <button onClick={onClick(4)} style={btn4 ? { color: "black" } : { color: "gray" }}>
        친구
      </button>
      <button onClick={onClick(5)} style={btn5 ? { color: "black" } : { color: "gray" }}>
        선생님
      </button>
      <button onClick={onClick(6)} style={btn6 ? { color: "black" } : { color: "gray" }}>
        기타
      </button>
    </div>
  );
}

export default Radios;
