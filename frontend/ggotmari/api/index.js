import axios from "axios";

// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    baseURL: "https://j7a303.p.ssafy.io/",
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

const fileApi = axios.create({
  baseURL: "https://j7a303.p.ssafy.io:8080/",
  headers: {
    "Content-Type": `multipart/form-data`,
  },
});

export { apiInstance };
