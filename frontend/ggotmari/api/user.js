import { apiInstance } from "./index";

const api = apiInstance();

async function doLogin(code, success, fail) {
  await api
    .post(`/auth/login`, {
      code,
    })
    .then(success)
    .catch(fail);
}

export { doLogin };
