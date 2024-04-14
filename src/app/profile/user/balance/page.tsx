"use client";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { useAuth } from "@/store/authContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AddMoney } from "../_components/AddMoney";
import { getUserBalance } from "@/http";

type Props = {};

function Balance({}: Props) {
  const { authState, balance, setBalance } = useAuth();
  return (
    <div className="flex gap-x-10">
      <div className="w-1/2">
        <div className="bg-white rounded-md border w-full">
          <div className="px-4 py-8">
            <p className="text-xs text-textGray">For stocks F&O</p>
            <h1 className="mt-3 text-2xl">
              {balance !== null ? formatPrice(balance) : "Loading..."}
            </h1>
          </div>
          <Separator className="" />
          <div className="py-4 px-4">
            <Link href="/profile/user/balance">
              <div className="flex items-center pt-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  All Transaction
                </span>
                <ArrowRight size={20} className="text-muted-foreground" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <AddMoney
          id={authState.user._id}
          // onBalanceUpdate={handleBalanceUpdate}
          balance={balance}
          setBalance={setBalance}
        />
      </div>
    </div>
  );
}

export default Balance;
