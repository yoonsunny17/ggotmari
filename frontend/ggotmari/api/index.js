import axios from "axios";

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    // baseURL: "https://j7a303.p.ssafy.io/api/",
    baseURL: "https://ggotmari.com/api/",
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

function fileApiInstance() {
  const instance = axios.create({
    // baseURL: "https://j7a303.p.ssafy.io/api/",
    baseURL: "https://ggotmari.com/api/",
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });
  return instance;
}

function ocrApiInstance() {
  const instance = axios.create({
    baseURL:
      "https://f4ezl42bnd.apigw.ntruss.com/custom/v1/18504/80c7fcaa5bdcc885b9b2f50d47bf318d6912525c5155daa072ee2800c0bd63e8/general",
    headers: {
      "Content-Type": `multipart/form-data`,
      "X-OCR-SECRET": "QldNQ1VXbnNIWUdhcFRsSEhsYUNUb2RRYnFWZFNhUE4=",
    },
  });
}

export { apiInstance, fileApiInstance, ocrApiInstance };
