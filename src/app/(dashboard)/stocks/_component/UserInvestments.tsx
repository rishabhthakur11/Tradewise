import Link from "next/link";
import React from "react";
import InvestmentCard from "./InvestmentCard";

type Props = {};

function UserInvestments({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-lg font-[500]">Your Investments</p>
        <Link className="text-[#0CB387]" href="#">
          dashboard
        </Link>
      </div>
      <div className="flex items-center justify-between mt-5">
        <InvestmentCard />
      </div>
    </div>
  );
}

export default UserInvestments;
