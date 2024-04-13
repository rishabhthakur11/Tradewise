import React from "react";
import Indexes from "../../_component/Indexes";
import Holdings from "../../_component/Holdings";

type Props = {};

function UserStockPortfolio({}: Props) {
  return (
    <div className="flex gap-x-16">
      {/* left side  */}
      <div className="w-[65%]">
        <div>
          <Indexes />
        </div>
        <div className="mt-10">
          <Holdings />
        </div>
      </div>
      {/* right side */}
      <div className="w-[35%]">
        <div className="mt-10"></div>
      </div>
    </div>
  );
}

export default UserStockPortfolio;
