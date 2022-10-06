import { useEffect, useState } from "react";
import FlowerCard from "../../atoms/index/FlowerCard";
import FlowerPagination from "./FlowerPagination";
import LongClickFlowerCard from "../../atoms/index/LongClickFlowerCard";
import { getSituationTag } from "../../../api/recommend";
import { useRouter } from "next/router";
import Image from "next/image";

function SpecialDayFlower(props) {
  useEffect(() => {}, []);
  console.log(props.waiting);
  const loading = props.waiting;
  // TODO: pagination
  const limit = 9;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const skeletonScheme = () => {
    return (
      <div className="animate-pulse">
        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
      </div>
    );
  };

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
        // <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        //   <div className="animate-pulse flex space-x-4">
        //     <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        //     <div className="flex-1 space-y-6 py-1">
        //       <div className="h-2 bg-slate-200 rounded"></div>
        //       <div className="space-y-3">
        //         <div className="grid grid-cols-3 gap-4">
        //           <div className="h-2 bg-slate-200 rounded col-span-2"></div>
        //           <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        //         </div>
        //         <div className="h-2 bg-slate-200 rounded"></div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
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
