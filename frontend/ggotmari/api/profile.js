import { apiInstance } from "./index";

const api = apiInstance();

async function getUser(username, success, fail) {
  await api
    .get(`user/${username}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function getUserFollow(username, success, fail) {
  await api
    .get(`user/${username}/follow`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function follow(credential, success, fail) {
  await api
    .post(
      `user/follow`,
      {
        isFollow: credential.isFollow,
        userName: credential.userName,
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

async function editUser(formData, success, fail) {
  await api
    .put(`user`, formData, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    })
    .then(success)
    .catch(fail);
}

async function signout(success, fail) {
  await api
    .delete(`user`, {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    })
    .then(success)
    .catch(fail);
}

export { getUser, getUserFollow, follow, editUser, signout };
