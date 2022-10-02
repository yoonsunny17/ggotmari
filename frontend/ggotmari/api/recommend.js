import { apiInstance } from "./index";

const api = apiInstance();

async function postLetterRecomm(content, success, fail) {
  await api.post(`recommend/letter`, content).then(success).catch(fail);
}

async function getSituationRecomm(success, fail) {
  await api
    .get(`recommend/situation`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function getArticleRecomm(success, fail) {
  await api
    .get(`recommend/article`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

async function postDislikeRecomm(content, success, fail) {
  await api
    .post(
      `recommend/dislike`,
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      },
      content
      // {
      //   kindId,
      // }
    )
    .then(success)
    .catch(fail);
}

async function getSituationTag(tagId, success, fail) {
  await api
    .get(`recommend/situation/${tagId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

export {
  postLetterRecomm,
  getSituationRecomm,
  getArticleRecomm,
  postDislikeRecomm,
  getSituationTag,
};
