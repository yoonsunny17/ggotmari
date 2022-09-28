import { apiInstance, fileApiInstance } from "./index";

const api = apiInstance();
const fileApi = fileApiInstance();

async function getFlowerKind(success, fail) {
  await api
    .get(`/community/article`, {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      // },
    })
    .then(success)
    .catch(fail);
}

async function postArticle(article, success, fail) {
  await fileApi
    .post(`/community/article`, article, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQyNDMzMDEsImV4cCI6MTY2NTUzOTMwMSwiZW1haWwiOiJqam9vbjAzMDZAbmF2ZXIuY29tIn0.xLkGTIv-3kEvz9VGxO9PVAGlskSiwF8fPGAwr6FlHiOP17htzEaVbickaNcgcN8ac4zWYIZ7fsuDjrtM7Nb5CQ",
      },
    })
    .then(success)
    .catch(fail);
}

async function getArticleList(success, fail) {
  await api
    .get(`/community/article/list`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQyNDMzMDEsImV4cCI6MTY2NTUzOTMwMSwiZW1haWwiOiJqam9vbjAzMDZAbmF2ZXIuY29tIn0.xLkGTIv-3kEvz9VGxO9PVAGlskSiwF8fPGAwr6FlHiOP17htzEaVbickaNcgcN8ac4zWYIZ7fsuDjrtM7Nb5CQ",
      },
    })
    .then(success)
    .catch(fail);
}

async function getArticleIds(success, fail) {
  await api.get(`/community/article/id`).then(success).catch(fail);
}

async function getArticleDetail(articleId, success, fail) {
  await api
    .get(`/community/article/${articleId}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQyNDMzMDEsImV4cCI6MTY2NTUzOTMwMSwiZW1haWwiOiJqam9vbjAzMDZAbmF2ZXIuY29tIn0.xLkGTIv-3kEvz9VGxO9PVAGlskSiwF8fPGAwr6FlHiOP17htzEaVbickaNcgcN8ac4zWYIZ7fsuDjrtM7Nb5CQ",
      },
    })
    .then(success)
    .catch(fail);
}

export {
  getFlowerKind,
  postArticle,
  getArticleList,
  getArticleIds,
  getArticleDetail,
};
