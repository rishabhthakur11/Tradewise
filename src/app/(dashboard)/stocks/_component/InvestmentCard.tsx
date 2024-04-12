import { formatPrice } from "@/lib/format";
import React from "react";

type Props = {};

function InvestmentCard({}: Props) {
  return (
    <div className="bg-white rounded-md border w-full cursor-pointer">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-md font-normal text-[#0CB387]">
            {formatPrice(1000)}
          </h1>
          <p className="text-sm text-gray-500">Total Returns</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <h1 className="text-md font-normal text-gray-800 text-end">
            {formatPrice(61571)}
          </h1>
          <p className="text-sm text-gray-500">Current Value</p>
        </div>
      </div>
    </div>
  );
}

export default InvestmentCard;
