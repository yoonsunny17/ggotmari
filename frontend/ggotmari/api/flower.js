import { apiInstance } from "./index";

const api = apiInstance();

async function getFlowerDetail(kindId, success, fail) {
  await api
    .get(`flower/${kindId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function postFlowerDetail(info, success, fail) {
  await api
    .post(
      `flower/${kindId}`,
      info,
      // {
      //   kindId,
      //   tagId,
      //   tagStatus,
      // },
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      },
    )
    .then(success)
    .catch(fail);
}

async function getDailyFlower(success, fail) {
  await api.get(`flower/daily`, {}).then(success).catch(fail);
}

async function getSearchFlower(searchText, success, fail) {
  await api.get(`flower/search/${searchText}`).then(success).catch(fail);
}

export { getFlowerDetail, postFlowerDetail, getDailyFlower, getSearchFlower };
