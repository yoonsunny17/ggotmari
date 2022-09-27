import { apiInstance } from "./index";

const api = apiInstance();

async function getFlowerDetail(success, fail) {
  await api
    .get(
      `flower/${subjectId}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    )
    .then(success)
    .catch(fail);
}

async function postFlowerDetail(success, fail) {
  await api
    .post(
      `flower/${subjectId}`,
      {
        kindId,
        tagId,
        tagStatus,
      },
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    )
    .then(success)
    .catch(fail);
}

async function getDailyFlower(success, fail) {
  await api.get(`flower/daily`, {}).then(success).catch(fail);
}

async function getSearchFlower(success, fail) {
  await api
    .get(`flower/search/${searchText}`, {
      searchText,
    })
    .then(success)
    .catch(fail);
}

export { getFlowerDetail, postFlowerDetail, getDailyFlower, getSearchFlower };
