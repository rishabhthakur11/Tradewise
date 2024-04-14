import getIndividualStocksData from "@/actions/getIndividualStocksData";
import getIndividualStockData from "@/actions/getIndividualStocksData";
import { formatPrice } from "@/lib/format";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import React from "react";

type Stock = {
  stockName: string;
};

async function StockDetails({ stockName }: Stock) {
  const stock = await getIndividualStocksData(stockName);
  let changeType: string;
  if (stock.lastPrice > stock.price) changeType = "negative";
  else changeType = "positive";

  const percentageChange =
    ((stock.price - stock.lastPrice) / stock.lastPrice) * 100;
  const change = stock.price - stock.lastPrice;
  // round to 2 decimal places
  const roundedPercentageChange = Math.round(percentageChange * 100) / 100;
  const roundedChange = Math.round(change * 100) / 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="border rounded-md w-fit h-fit p-1 bg-white">
          <Image
            src={stock.imageUrl}
            width={50}
            height={50}
            alt="Stock Image"
            priority
          />
        </div>
        <div className="flex gap-x-2 border rounded-md p-2 hover:shadow delay-300 cursor-pointer">
          <Bookmark size={15} className="text-textGray" />
          <p className="text-xs text-textGray">Watchlist</p>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-semibold mt-2 text-textGray">
          {stock.name}
        </h1>
        <p className="text-textGray mt-1">{stock.symbol}</p>
      </div>
      <div className="mt-10">
        <div className="flex gap-x-2 items-end">
          <p
            className={`${
              changeType == "positive" ? "text-[#0CB387]" : "text-[#EB5B3C]"
            } text-2xl font-normal`}
          >
            {formatPrice(stock.price)}
          </p>
          <p
            className={`${
              changeType == "positive" ? "text-[#0CB387]" : "text-[#EB5B3C]"
            }  text-xs pb-1`}
          >
            {roundedChange + " "} ({roundedPercentageChange} %)
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl overflow-hidden border  min-h-[350px] max-h-[350px] cursor-pointer w-full h-full hover:shadow delay-300 mb-5 flex items-center justify-center mt-2">
        <h1 className="text-lg font-normal text-textGray">Charts in future</h1>
      </div>
      <div className="mt-16">
        <h1 className="text-lg font-semibold text-textGray ">Fundamentals</h1>
        <div>
          <div className="flex justify-between mt-5">
            <p className="text-textGray">Symbol</p>
            <p className="text-textGray">{stock.symbol}</p>
          </div>
          <div className="flex justify-between mt-5">
            <p className="text-textGray">Price</p>
            <p className="text-textGray">{stock.price}</p>
          </div>
          <div className="flex justify-between mt-5">
            <p className="text-textGray">Total Quantity</p>
            <p className="text-textGray">{stock.quantity}</p>
          </div>
          <div className="flex justify-between mt-5">
            <p className="text-textGray">Returns</p>
            <p
              className={`${
                changeType == "positive" ? "text-[#0CB387]" : "text-[#EB5B3C]"
              }`}
            >
              {roundedChange} ({roundedPercentageChange} %)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockDetails;
