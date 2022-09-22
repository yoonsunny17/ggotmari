import { apiInstance } from "./index";

const api = apiInstance();

async function getFlowerKind(success, fail) {
  await api
    .get(`/api/community/article`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
    })
    .then(success)
    .catch(fail);
}

export { getFlowerKind };
