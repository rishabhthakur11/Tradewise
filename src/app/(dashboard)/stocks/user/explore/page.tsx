import React, { Suspense } from "react";
import Indexes from "../../_component/Indexes";
import UserInvestments from "../../_component/UserInvestments";
import Stocks from "../../_component/Stocks";
import WatchList from "../../_component/WatchList";

type Props = {};

function page({}: Props) {
  return (
    <div className="flex gap-x-16">
      {/* left side  */}
      <div className="w-[65%]">
        <div>
          <Indexes />
        </div>
        <div className="mt-10">
          <Suspense fallback={<div>Loading...</div>}>
            <Stocks />
          </Suspense>
        </div>
      </div>
      {/* right side */}
      <div className="w-[35%]">
        <UserInvestments />
        <div className="mt-10">
          <WatchList />
        </div>
      </div>
    </div>
  );
}

export default page;
