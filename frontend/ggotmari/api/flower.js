import { apiInstance } from "./index";

const api = apiInstance();

async function getFlowerDetail(success, fail) {
  await api
    .get(
      `flower/${subjectId}`,
      {},
      {
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQyNjg1NjMsImV4cCI6MTY2NTU2NDU2MywiZW1haWwiOiJqdW5zeXMyMjNAbmF2ZXIuY29tIn0.DTeeKZwW7k-t7U9DblTxwlAcT87C123tERzFGc5xOFePjMK-EbjCf7MZ4lfd8_zNDsn3IQ7TXh7THn-7xEGQTA",
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
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQyNjg1NjMsImV4cCI6MTY2NTU2NDU2MywiZW1haWwiOiJqdW5zeXMyMjNAbmF2ZXIuY29tIn0.DTeeKZwW7k-t7U9DblTxwlAcT87C123tERzFGc5xOFePjMK-EbjCf7MZ4lfd8_zNDsn3IQ7TXh7THn-7xEGQTA",
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
