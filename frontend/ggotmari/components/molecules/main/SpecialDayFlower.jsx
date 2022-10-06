import { useEffect, useState } from "react";
import FlowerCard from "../../atoms/index/FlowerCard";
import FlowerPagination from "./FlowerPagination";
import LongClickFlowerCard from "../../atoms/index/LongClickFlowerCard";
import { getSituationTag } from "../../../api/recommend";
import { useRouter } from "next/router";

function SpecialDayFlower(props) {
  useEffect(() => {}, []);
  // TODO: pagination
  const limit = 9;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  return (
    <div>
      <div className="">
        <div className="w-full grid grid-cols-3 gap-x-3 gap-y-3">
          {props.isRecommended.tags
            .slice(offset, offset + limit)
            .map((info, idx) => {
              return <LongClickFlowerCard info={info} key={idx} />;
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
  );
}

export default SpecialDayFlower;
