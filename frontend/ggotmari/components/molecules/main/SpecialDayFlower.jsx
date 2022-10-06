import { useEffect, useState } from "react";
import FlowerCard from "../../atoms/index/FlowerCard";
import FlowerPagination from "./FlowerPagination";
import LongClickFlowerCard from "../../atoms/index/LongClickFlowerCard";
import { getSituationTag } from "../../../api/recommend";
import { useRouter } from "next/router";
import Image from "next/image";

function SpecialDayFlower(props) {
  useEffect(() => {}, []);
  const loading = props.waiting;
  // TODO: pagination
  const limit = 9;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  return (
    <div>
      {loading ? (
        <div className="animate-pulse">
          <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="aspect-square bg-gray-200 rounded"></div>
          </div>
          <div className="bg-extra4/90 text-white text-sm w-full h-9 py-2 my-4 rounded-md"></div>
        </div>
      ) : (
        <div>
          <div className="">
            <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
              {props.isRecommended.tags
                .slice(offset, offset + limit)
                .map((info, idx) => {
                  return (
                    <LongClickFlowerCard
                      loading={loading}
                      info={info}
                      key={idx}
                    />
                  );
                })}
            </div>
          </div>
          <FlowerPagination
            total={props.isRecommended.tags.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default SpecialDayFlower;
