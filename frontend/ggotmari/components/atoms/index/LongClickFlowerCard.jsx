import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import noImg from "../../../assets/flower/square.png";

// import { getFlowerDetail } from "../../../api/flower";
import { postDislikeRecomm } from "../../../api/recommend";

import Swal from "sweetalert2";

function LongClickFlowerCard(props) {
  const router = useRouter();
  const handlePostClick = () => {
    router.push({
      pathname: `/flower/${props.info.subjectId}`,
      query: { kindId: props.info.kindId },
    });
  };

  const handleClickDislike = (e) => {
    const kindId = {
      kindId: props.info.kindId,
    };

    // console.log(`kindId: ${props.info.kindId}`);

    postDislikeRecomm(
      kindId,
      (res) => {
        console.log(res);
        router.push(`/`);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // TODO: 스타일 적용, 사이즈 조절

  const openSwal = () => {
    Swal.fire({
      title: `정말 ${
        props.info.kindName.split(" ")[1]
      } 추천을 그만 받으시겠습니까?`,
      // title: `정말 꽃 추천을 그만 받으시겠습니까?`,
      text: "추천을 그만 받으면 앞으로 해당 꽃이 표시 되지 않습니다.",
      width: 300,
      height: 250,
      showDenyButton: true,
      confirmButtonColor: "#6E85B7",
      denyButtonColor: "#84898C",
      confirmButtonText: "네",
      denyButtonText: "아니요",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      // TODO: 추천 안받기 API 연동 수정하기
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("^-^", "다른 꽃들을 추천해 드릴게요");
        handleClickDislike();
      }
    });
  };

  // TODO: long press event => 꾹 눌렀을 때 alert
  // TODO: 일반 클릭 시 링크 이동

  const [action, setAction] = useState("");
  const timerRef = useRef();
  const isLongPress = useRef();

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction("longpress");
    }, 1000);
  }

  function handleOnClick(e) {
    console.log("handleOnClick");
    if (isLongPress.current) {
      console.log("Is long press - not continuing.");
      return;
    }
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
    if (action === "longpress") return;
    console.log("handleOnTouchEnd");
    clearTimeout(timerRef.current);
  }

  const successLongClick = () => {
    console.log("successful long click");
    openSwal();
    setAction(undefined);
  };

  return (
    <div>
      <div
        onClick={handleOnClick}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={handleOnTouchEnd}
        className=" cursor-pointer rounded-lg aspect-square overflow-hidden relative brightness-96"
      >
        <Image
          src={props.info.kindImage ? props.info.kindImage : noImg.src}
          alt={props.info.kindImage}
          layout="responsive"
          width={200}
          height={200}
          objectFit="cover"
          priority
        />
      </div>

      <div>
        {action === "click" && handlePostClick()}
        {action === "longpress" && successLongClick()}
      </div>
    </div>
  );
}

export default LongClickFlowerCard;
