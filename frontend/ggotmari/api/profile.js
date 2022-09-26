import { apiInstance } from "./index";

const api = apiInstance();

async function getUser(username, success, fail) {
  await api
    .get(`api/user/${username}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function getUserFollow(username, success, fail) {
  await api
    .get(`/user/${username}/follow`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
    })
    .then(success)
    .catch(fail);
}

async function follow(credential, success, fail) {
  await api
    .post(`/user/follow`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
      // isFollow: credential.isFollow, userName: credential.userName,
    })
    .then(success)
    .catch(fail);
}

async function editUser(credential, success, fail) {
  await api
    .post(`/user/follow`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
      // userImage: credential.userImage, userName: credential.userName, birthday: credential.birthday, sex: credential.sex,
    })
    .then(success)
    .catch(fail);
}

async function signout(success, fail) {
  await api
    .delete(`/user/follow`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
    })
    .then(success)
    .catch(fail);
}

export { getUser, getUserFollow, follow, editUser, signout };
