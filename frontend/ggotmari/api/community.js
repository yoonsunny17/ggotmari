import { apiInstance, fileApiInstance } from "./index";

const api = apiInstance();
const fileApi = fileApiInstance();

async function getFlowerKind(success, fail) {
  await api
    .get(`/api/community/article`, {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      // },
    })
    .then(success)
    .catch(fail);
}

async function postArticle(article, success, fail) {
  await fileApi
    .post(`/api/community/article`, article, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQyNDMzMDEsImV4cCI6MTY2NTUzOTMwMSwiZW1haWwiOiJqam9vbjAzMDZAbmF2ZXIuY29tIn0.xLkGTIv-3kEvz9VGxO9PVAGlskSiwF8fPGAwr6FlHiOP17htzEaVbickaNcgcN8ac4zWYIZ7fsuDjrtM7Nb5CQ",
      },
    })
    .then(success)
    .catch(fail);
}

async function getArticles(success, fail) {
  await api
    .get(`api/community/article/list`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQyNDMzMDEsImV4cCI6MTY2NTUzOTMwMSwiZW1haWwiOiJqam9vbjAzMDZAbmF2ZXIuY29tIn0.xLkGTIv-3kEvz9VGxO9PVAGlskSiwF8fPGAwr6FlHiOP17htzEaVbickaNcgcN8ac4zWYIZ7fsuDjrtM7Nb5CQ",
      },
    })
    .then(success)
    .catch(fail);
}

export { getFlowerKind, postArticle, getArticles };
