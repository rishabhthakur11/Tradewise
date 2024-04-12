import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  symbol: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  lastPrice: number;
};

function StocksCard({
  symbol,
  name,
  imageUrl,
  price,
  quantity,
  lastPrice,
}: Props) {
  let changeType: string;
  if (lastPrice > price) changeType = "negative";
  else changeType = "positive";

  const percentageChange = ((price - lastPrice) / lastPrice) * 100;
  const change = price - lastPrice;
  // round to 2 decimal places
  const roundedPercentageChange = Math.round(percentageChange * 100) / 100;
  const roundedChange = Math.round(change * 100) / 100;

  return (
    <div className="bg-white rounded-md overflow-hidden border min-w-[160px] max-w-[160px] min-h-[180px] max-h-[180px] cursor-pointer w-full h-full hover:shadow delay-300 mb-5">
      <Link href={`/stocks/${symbol}`}>
        <div className="px-4 py-2 flex flex-col justify-between min-h-[170px] max-h-[170px] h-full">
          <div>
            <div className="border rounded-md w-fit h-fit p-1 bg-white">
              <Image src={imageUrl} width={35} height={35} alt={name} />
            </div>
            <div className="mt-3">
              <h1 className="text-sm font-normal text-textGray mt-2  h-[40px]">
                {name.length > 30 ? name.slice(0, 30) + "..." : name}
              </h1>
            </div>
          </div>
          <div className="">
            <p
              className={`${
                changeType == "positive" ? "text-[#0CB387]" : "text-[#EB5B3C]"
              } text-md`}
            >
              {formatPrice(price)}
            </p>
            <p
              className={`${
                changeType == "positive" ? "text-[#0CB387]" : "text-[#EB5B3C]"
              } mt-1 text-xs`}
            >
              {roundedChange + " "} ({roundedPercentageChange} %)
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default StocksCard;
