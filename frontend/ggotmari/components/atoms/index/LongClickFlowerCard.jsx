import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Swal from "sweetalert2";

function LongClickFlowerCard({
  info: { subjectId, kindId, flowerName, imgUrl },
}) {
  const router = useRouter();
  const handlePostClick = () => {
    router.push(
      {
        pathname: `flower/${subjectId}`,
      },
      `flower/${subjectId}`
    );
  };

  // TODO: 스타일 적용, 사이즈 조절
  const openSwal = () => {
    Swal.fire({
      title: `정말 ${flowerName} 추천을 그만 받으시겠습니까?`,
      text: "추천을 그만 받으면 앞으로 해당 꽃이 표시 되지 않습니다.",
      width: 300,
      height: 250,
      // icon: "warning",
      // showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: "#FFD365",
      denyButtonColor: "#709FB0",
      // cancelButtonColor: "#d33",
      confirmButtonText: "네",
      denyButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  // TODO: long press event => 꾹 눌렀을 때 alert
  // TODO: 일반 클릭 시 링크 이동

  const [action, setAction] = useState("");

  const clearAction = () => {
    action: "";
  };
  const timerRef = useRef();

  function startPressTimer() {
    timerRef.current = setTimeout(() => {
      setAction("longpress");
    }, 500);
  }

  function handleOnClick(e) {
    setAction("click");
  }
  function handleOnMouseDown() {
    console.log("handleOnMouseDown");
    startPressTimer();
  }

  function handleOnMouseUp() {
    console.log("handleOnMouseUp");
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart() {
    console.log("handleOnTouchStart");
    startPressTimer();
  }

  function handleOnTouchEnd() {
    console.log("handleOnTouchEnd");
    clearTimeout(timerRef.current);
  }

  return (
    <div
      onClick={handleOnClick}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      className=" cursor-pointer rounded-lg aspect-square overflow-hidden relative brightness-96"
    >
      <img
        className="w-full h-full object-cover"
        src={imgUrl}
        alt={flowerName}
      />

      {!action && clearAction()}
      {action === "click" && handlePostClick()}
      {action === "longpress" && openSwal()}
    </div>
  );
}

export default LongClickFlowerCard;