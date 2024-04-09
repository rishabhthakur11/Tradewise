import { formatPrice } from "@/lib/format";
import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  name: string;
  imageUrl: StaticImageData | string;
  value: number;
  change: number;
  changeType: string;
};

function StocksCard({ name, imageUrl, value, change, changeType }: Props) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border w-[180px] h-[200px] cursor-pointer">
      <div className="px-4 py-2 pr-5">
        <Image src={imageUrl} width={35} alt={name} />
        <h1 className="text-sm font-normal text-gray-800 mt-4">{name}</h1>
        <p
          className={`${
            changeType == "positive" ? "text-[#0CB387]" : "text-[#EB5B3C]"
          } text-sm mt-12`}
        >
          Value: {formatPrice(value)}
        </p>
        <p
          className={`${
            changeType == "positive" ? "text-[#0CB387]" : "text-[#EB5B3C]"
          } mt-1 text-sm`}
        >
          ({change} %)
        </p>
      </div>
    </div>
  );
}

export default StocksCard;
