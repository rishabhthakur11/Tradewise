"use client";
import Link from "next/link";
import React from "react";
import InvestmentCard from "./InvestmentCard";
import { useAuth } from "@/store/authContext";

type Props = {};

function UserInvestments({}: Props) {
  const { authState } = useAuth();
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-lg font-[500]">Your Investments</p>
        <Link className="text-sky-700" href="/stocks/user/investments">
          Dashboard
        </Link>
      </div>
      <div className="flex items-center justify-between mt-5">
        <InvestmentCard userId={authState.user._id} />
      </div>
    </div>
  );
}

export default UserInvestments;
