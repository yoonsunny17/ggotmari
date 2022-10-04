import { apiInstance, ocrApiInstance } from "./index";

const api = apiInstance();
const ocrApi = ocrApiInstance();

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

async function postDislikeRecomm(kindId, success, fail) {
  await api
    .post(
      `recommend/dislike`,
      kindId,
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      },
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

async function getOcrRecommend(image, success, fail) {
  await ocrApi.post("", {
    message: {
      images: [{ format: "jpg", name: "ggotmari" }],
      requestId: "ggotmari",
      version: "V2",
      timestamp: 0,
    },
    file: image,
  });
}

export {
  postLetterRecomm,
  getSituationRecomm,
  getArticleRecomm,
  postDislikeRecomm,
  getSituationTag,
};
