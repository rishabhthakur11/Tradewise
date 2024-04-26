"use client";
import calculateProfitLoss from "@/actions/profitLoss";
import { Skeleton } from "@/components/ui/skeleton";
import { getIndividualStock, getUserInvestments } from "@/http";
import { formatPrice } from "@/lib/format";
import { useAuth } from "@/store/authContext";
import APIResponseType from "@/utils/interfaces/response";
import { Transaction } from "@/utils/interfaces/transactionType";
import { Lock } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

const Holdings = () => {
  const { authState } = useAuth();
  const userId = authState.user._id;
  const [userInvestments, setUserInvestments] = useState<Transaction[]>([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  let totalInvestment = 0;

  useEffect(() => {
    const fetchInvestment = async () => {
      const res = await getUserInvestments({ userId });
      const { success }: APIResponseType = res;
      if (success) {
        setUserInvestments(res.data);
        // Calculate profit or loss
        const profitLoss = await calculateProfitLoss(res.data);
        setTotalProfitLoss(profitLoss);
        setIsLoading(false); // Set loading state to false once calculations are done
      }
    };
    fetchInvestment();
  }, [userId]);

  userInvestments.forEach((transaction) => {
    totalInvestment += transaction.price * transaction.quantity;
  });

  const currentValue = useMemo(
    () => totalInvestment + totalProfitLoss,
    [totalInvestment, totalProfitLoss]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-lg font-[500]">
          Holdings in your portfolio
        </p>
        <div className="flex gap-x-2 border rounded-md p-2 hover:shadow delay-300 cursor-pointer">
          <Lock size={15} className="text-textGray" />
          <p className="text-xs text-textGray">Verify Holdings</p>
        </div>
      </div>
      <div className="w-full border mt-5  rounded-md rounded-bl-none rounded-br-none bg-[#ECFAF5]">
        <div className="px-10 py-10">
          <div className="w-full flex items-center justify-between">
            <div>
              {typeof window !== "undefined" && isLoading ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                <h1 className="text-2xl h-6">{formatPrice(currentValue)}</h1>
              )}

              <p className="text-sm text-textGray mt-2">Current Value</p>
            </div>
            <div>
              <p className="text-sm text-textGray flex items-center gap-x-5">
                Invested value:
                {typeof window !== "undefined" && isLoading ? (
                  <Skeleton className="h-6 w-[80px]" />
                ) : (
                  <span className="ml-5">{formatPrice(totalInvestment)}</span>
                )}
              </p>
              <p className="text-sm text-textGray mt-2 flex items-center justify-between">
                Total Return:
                {typeof window !== "undefined" && isLoading ? (
                  <Skeleton className="h-6 w-[80px]" />
                ) : (
                  <span className="ml-5">{formatPrice(totalProfitLoss)}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Holdings;
