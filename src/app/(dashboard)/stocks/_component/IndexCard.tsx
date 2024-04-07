import { formatPrice } from "@/lib/format";
import React from "react";

type Props = {
  name: string;
  value: number;
  change: number;
  changeType: string;
};

function IndexCard({ name, value, change, changeType }: Props) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border w-fit cursor-pointer">
      <div className="px-4 py-2 pr-10">
        <h1 className="text-md font-normal text-gray-800">{name}</h1>
        <p
          className={`${
            changeType == "positive" ? "text-[#0CB387]" : "text-[#EB5B3C]"
          } mt-2 text-sm `}
        >
          Value: {formatPrice(value)} ({change} %)
        </p>
      </div>
    </div>
  );
}

export default IndexCard;
