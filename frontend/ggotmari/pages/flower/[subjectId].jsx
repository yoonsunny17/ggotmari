import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

import { getFlowerDetail, postFlowerCollection } from "../../api/flower";

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

  const replacedText = subjectLanguage.replaceAll("/", "\n");

  return collectionStatus == undefined ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-5">
        <svg
          className="animate-spin h-10 w-10 text-main"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx={12}
            cy={12}
            r={10}
            stroke="currentColor"
            strokeWidth={4}
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962"
          ></path>
        </svg>
        <div className="font-sans text-xl text-main">꽃 불러오는 중...</div>
      </div>
    </div>
  ) : (
    <div className="mb-10 w-screen">
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
          <div className="font-sans text-font2 text-sm mb-5">
            {subjectName}의 꽃말은 {/* 꽃말 부분만 bold 강조 */}
            <div className="whitespace-pre-line">
              <span className="text-font1">{replacedText}</span> 입니다
            </div>
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
        <div className="mb-20">
          <div className="font-gangwon text-lg pb-3 pt-4">
            {subjectName} 이야기
          </div>
          {articles.length == 0 ? (
            <div className="text-font2 font-sans">아직 이야기가 없습니다</div>
          ) : (
            <div className="grid grid-cols-3 gap-x-3 gap-y-2.5">
              {articles.map((info, idx) => {
                return <RelatedPosts info={info} key={idx} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlowerDetail;
