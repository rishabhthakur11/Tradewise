"use client";
import calculateProfitLoss from "@/actions/profitLoss";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserInvestments } from "@/http";
import { formatPrice } from "@/lib/format";
import APIResponseType from "@/utils/interfaces/response";
import { Transaction } from "@/utils/interfaces/transactionType";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  userId: string;
};

function InvestmentCard({ userId }: Props) {
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
    <div className="bg-white rounded-md border w-full cursor-pointer">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex flex-col gap-y-3">
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <h1 className="text-md h-6">{formatPrice(totalProfitLoss)}</h1>
          )}
          <p className="text-sm text-gray-500">Total Returns</p>
        </div>
        <div className="flex flex-col gap-y-3">
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <h1 className="text-md h-6 text-end">
              {formatPrice(currentValue)}
            </h1>
          )}
          <p className="text-sm text-gray-500">Current Value</p>
        </div>
      </div>
    </div>
  );
}

export default InvestmentCard;
