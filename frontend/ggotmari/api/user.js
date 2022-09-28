import { apiInstance } from "./index";

const api = apiInstance();

async function doLogin(code, success, fail) {
  await api
    .post(`/api/auth/login`, {
      code,
    })
    .then(success)
    .catch(fail);
}

async function getUserName(success, fail) {
  await api
    .get(`user`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

export { doLogin, getUserName };
