import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useLongPress, LongPressDetectEvents } from "use-long-press";

function FlowerCard({ info: { subjectId, kindId, flowerName, imgUrl } }) {
  const router = useRouter();

  // TODO: long click event; true ? alert : go to flower/${subjectId}
  const [enabled, setEnabled] = useState(true);
  const callback = useCallback(() => {
    alert("Long pressed!");
  }, []);
  const bind = useLongPress(enabled ? callback : null, {
    onStart: () => console.log("꾹 눌렀다!"),
    onFinish: () => console.log("long press 끝!"),
    onCancel: () => console.log("일반 클릭이었네!"),
    threshold: 500, // 한번 해보고 타이머 조정해볼 것
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.BOTH,
  });

  // 길게 눌렸다면 alert 띄우고,
  // 짧게 눌렸다면 이쪽으로 이동해주기
  const handlePostClick = () => {
    router.push(
      {
        pathname: `flower/${subjectId}`,
      },
      `flower/${subjectId}`
    );
  };
  return (
    <div
      onClick={handlePostClick}
      className="cursor-pointer rounded-lg aspect-square overflow-hidden relative brightness-96"
    >
      <img
        {...bind}
        className="w-full h-full object-cover"
        src={imgUrl}
        alt={flowerName}
      />
      <div>
        <label htmlFor="enabled">
          <input
            type="checkbox"
            id="enabled"
            checked={enabled}
            onChange={() => setEnabled((current) => !current)}
          />
          hook enabled
        </label>
      </div>
    </div>
  );
}

export default FlowerCard;
