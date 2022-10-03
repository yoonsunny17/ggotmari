import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

import { getFlowerDetail, postFlowerCollection } from "../../api/flower";
import { postDislikeRecomm } from "../../api/recommend";

import RelatedPosts from "../../components/molecules/flower/RelatedPosts";
import SimilarFlowers from "../../components/molecules/flower/SimilarFlowers";

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

function FlowerDetail() {
  const router = useRouter();

  const tabContArr = ["가족", "연인", "직장동료", "친구", "선생님", "기타"];
  const [subjectName, setSubjectName] = useState("");
  const [subjectLanguage, setSubjectLanguage] = useState("");
  const [kindList, setKindList] = useState();
  const [articles, setArticles] = useState();
  const [selectedKind, setSelectedKind] = useState();
  const [selectedKindIdx, setSelectedKindIdx] = useState();
  const [collectionStatus, setCollectionStatus] = useState();

  useEffect(() => {
    getFlowerDetail(
      router.query.subjectId,
      (res) => {
        setSubjectName(res.data.subjectName);
        setSubjectLanguage(res.data.subjectLanguage);
        setKindList(res.data.kinds);
        setArticles(res.data.articles);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (kindList != undefined) {
      const idx = kindList.findIndex(
        (kind) => kind.kindId == router.query.kindId
      );
      setSelectedKindIdx(idx);
      setSelectedKind(kindList[idx]);
    }
  }, [kindList]);

  useEffect(() => {
    if (selectedKind != undefined) {
      setCollectionStatus(selectedKind.tags.map((tag) => tag.tagStatus));
    }
  }, [selectedKind]);

  const handleCollectionClick = (tabIdx) => {
    postFlowerCollection(
      {
        kindId: selectedKind.kindId,
        tagId: tabIdx + 1,
        tagStatus: !collectionStatus[tabIdx],
      },
      (res) => {
        kindList[selectedKindIdx].tags[tabIdx].tagStatus =
          !kindList[selectedKindIdx].tags[tabIdx].tagStatus;
        collectionStatus[tabIdx] = !collectionStatus[tabIdx];
        setCollectionStatus([...collectionStatus]);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleFlowercardClick = (info, idx) => {
    setSelectedKindIdx(idx);
    setSelectedKind(info);
  };

  return collectionStatus == undefined ? (
    <div>로딩중</div>
  ) : (
    <div className="mb-10 w-screen">
      {/* <img
      className="w-full aspect-square object-cover"
      src={flowerInfo.kindImage}
      alt="flower image"
    /> */}
      <Image
        src={selectedKind.kindImage}
        alt={selectedKind.kindName}
        layout="responsive"
        width={500}
        height={500}
        objectFit="cover"
        priority
      />
      <div className="px-6 pt-6 divide-y divide-sub1 divide-opacity-60">
        {/* 품종명, 품목명, 꽃말 */}
        <div>
          <div className="font-gangwon text-2xl font-medium mb-4">
            {/* 품종명, 품목명 */}
            {selectedKind.kindName}, {subjectName}
          </div>
          {/* 꽃말 */}
          <div className="font-sanslight text-font2 text-sm mb-5">
            {subjectName}의 꽃말은 {/* 꽃말 부분만 bold 강조 */}
            <span className="font-bold">{subjectLanguage}</span> 입니다
          </div>
        </div>

        {/* 컬렉션에 담기 */}
        <div>
          <div className="font-gangwon text-lg pt-4 pb-3">컬렉션에 담기</div>
          <div className="flex justify-between mb-5 space-x-1.5">
            {tabContArr.map((tab, idx) => {
              return (
                <div
                  key={idx}
                  className={`grow px-0.5 py-2.5 rounded-md font-sans text-white text-xs text-center hover:cursor-pointer ${
                    collectionStatus[idx] ? "bg-main" : "bg-extra4"
                  }`}
                  onClick={() => handleCollectionClick(idx)}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        </div>

        {/* 다른 품종 보기 */}
        <div>
          <div className="font-gangwon text-lg pt-4 pb-4">
            {subjectName}의 다른 품종
          </div>

          <div className="carousel w-full">
            {kindList.map((info, idx) => {
              return (
                <div
                  className="carousel-item w-1/4 px-1"
                  key={idx}
                  onClick={() => handleFlowercardClick(info, idx)}
                >
                  <SimilarFlowers info={info} key={idx} />
                </div>
              );
            })}
          </div>
        </div>

        {/* 연관 게시물 보기 */}
        <div className="mb-16">
          <div className="font-gangwon text-lg pb-3 pt-4">
            {subjectName}를 담은 이야기
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-2.5">
            {articles.map((info, idx) => {
              return <RelatedPosts info={info} key={idx} />;
            })}
            {/* {relatedPostArr.map((info, idx) => {
            return <RelatedPosts info={info} key={idx} />;
          })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowerDetail;
