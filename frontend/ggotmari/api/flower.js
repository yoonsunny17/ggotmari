import { apiInstance } from "./index";

const api = apiInstance();

async function getFlowerDetail(subjectId, success, fail) {
  await api
    .get(`flower/${subjectId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        // Authorization:
        //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQyNDMzMDEsImV4cCI6MTY2NTUzOTMwMSwiZW1haWwiOiJqam9vbjAzMDZAbmF2ZXIuY29tIn0.xLkGTIv-3kEvz9VGxO9PVAGlskSiwF8fPGAwr6FlHiOP17htzEaVbickaNcgcN8ac4zWYIZ7fsuDjrtM7Nb5CQ",
      },
    })
    .then(success)
    .catch(fail);
}

async function postFlowerCollection(info, success, fail) {
  await api
    .post(`flower`, info, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        // Authorization:
        //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQyNDMzMDEsImV4cCI6MTY2NTUzOTMwMSwiZW1haWwiOiJqam9vbjAzMDZAbmF2ZXIuY29tIn0.xLkGTIv-3kEvz9VGxO9PVAGlskSiwF8fPGAwr6FlHiOP17htzEaVbickaNcgcN8ac4zWYIZ7fsuDjrtM7Nb5CQ",
      },
    })
    .then(success)
    .catch(fail);
}

async function getDailyFlower(success, fail) {
  await api.get(`flower/daily`).then(success).catch(fail);
}

async function getSearchFlower(searchText, success, fail) {
  await api.get(`flower/search/${searchText}`).then(success).catch(fail);
}

export {
  getFlowerDetail,
  postFlowerCollection,
  getDailyFlower,
  getSearchFlower,
};
