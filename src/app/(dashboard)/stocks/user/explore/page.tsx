import React from "react";
import Indexes from "../../_component/Indexes";
import UserInvestments from "../../_component/UserInvestments";
import Stocks from "../../_component/Stocks";
import WatchList from "../../_component/WatchList";

type Props = {};

function page({}: Props) {
  return (
    <div className="flex gap-x-16">
      {/* left side  */}
      <div className="w-3/5">
        <div>
          <Indexes />
        </div>
        <div className="mt-10">
          <Stocks />
        </div>
      </div>
      {/* right side */}
      <div className="w-2/5">
        <UserInvestments />
        <div className="mt-10">
          <WatchList />
        </div>
      </div>
    </div>
  );
}

export default page;
