import React from "react";
import Indexes from "../../_component/Indexes";
import UserInvestments from "../../_component/UserInvestments";

type Props = {};

function page({}: Props) {
  return (
    <div className="flex gap-x-16">
      {/* left side  */}
      <div className="w-3/5">
        <div>
          <Indexes />
        </div>
      </div>
      {/* right side */}
      <div className="w-2/5">
        <UserInvestments />
      </div>
    </div>
  );
}

export default page;
