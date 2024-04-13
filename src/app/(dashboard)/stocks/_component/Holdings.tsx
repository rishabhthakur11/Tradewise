import { formatPrice } from "@/lib/format";
import { Lock } from "lucide-react";
import React from "react";

type Props = {};

function Holdings({}: Props) {
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
      <div className="w-full border mt-5 bg-themeBlue/10 rounded-md">
        <div className="px-10 py-10">
          <div className="w-3/4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl">{formatPrice(192)}</h1>
              <p className="text-sm text-textGray mt-2">Current Value</p>
            </div>
            <div>
              <p className="text-sm text-textGray">
                Invested value: <span className="ml-5">{formatPrice(191)}</span>
              </p>
              <p className="text-sm text-textGray mt-2">
                Total Return: <span className="ml-5">{formatPrice(1)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Holdings;
