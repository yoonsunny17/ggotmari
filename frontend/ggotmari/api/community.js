import { apiInstance, fileApiInstance } from "./index";

const api = apiInstance();
const fileApi = fileApiInstance();

async function getFlowerKind(success, fail) {
  await api.get(`/community/article`).then(success).catch(fail);
}

async function postArticle(articleInfo, success, fail) {
  await fileApi
    .post(`/community/article`, articleInfo, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function editArticle(articleId, articleInfo, success, fail) {
  await fileApi
    .put(`/community/article/${articleId}`, articleInfo, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function getArticleList(success, fail) {
  await api
    .get(`/community/article/list`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function postArticleLike(articleId, isLike, success, fail) {
  await api
    .post(
      `/community/article/${articleId}/like`,
      { isLike: isLike },
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    )
    .then(success)
    .catch(fail);
}

async function postArticleComment(articleId, comment, success, fail) {
  await api
    .post(
      `/community/article/${articleId}/comment`,
      { commentContent: comment },
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    )
    .then(success)
    .catch(fail);
}

async function getArticleIds(success, fail) {
  await api.get(`/community/article/id`).then(success).catch(fail);
}

async function getPopularList(success, fail) {
  await api.get(`/community/article/popular`).then(success).catch(fail);
}

async function getArticleDetail(articleId, success, fail) {
  await api
    .get(`/community/article/${articleId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function deleteArticle(articleId, success, fail) {
  await api
    .delete(`/community/article/${articleId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function editComment(articleId, comment, success, fail) {
  await api
    .put(`/community/article/${articleId}/comment`, comment, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function deleteComment(articleId, commentId, success, fail) {
  await api
    .delete(`/community/article/${articleId}/comment`, {
      data: { commentId: commentId },
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

export {
  getFlowerKind,
  postArticle,
  editArticle,
  postArticleComment,
  postArticleLike,
  getArticleList,
  getArticleIds,
  getArticleDetail,
  deleteArticle,
  editComment,
  deleteComment,
  getPopularList,
};
