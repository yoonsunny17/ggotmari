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
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NjQxODE2MDcsImV4cCI6MTY2NTQ3NzYwNywiZW1haWwiOiJqam9vbjAzMDZAbmF2ZXIuY29tIn0.2wmZT7q_67YSB7nDn0eNsNohS32xHZc3RmrTwdnmSsl835Tb7-BkA9aa8PHdv6j0wEnfymYFVsd-iiGh9P04jw",
      },
    })
    .then(success)
    .catch(fail);
}

export { getFlowerKind, postArticle };
