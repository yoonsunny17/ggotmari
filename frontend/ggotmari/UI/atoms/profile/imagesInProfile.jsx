import { useEffect } from "react";

function imagesInProfile(url, title) {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <img
      src={url}
      alt={`${title} 관련 사진입니다.`}
      style={{
        width: `${(windowSize.innerWidth * 27) / 100}`,
        height: `${(windowSize.innerWidth * 27) / 100}`,
        objectFit: "cover",
        borderRadius: "15px",
      }}
    />
  );
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default imagesInProfile;
