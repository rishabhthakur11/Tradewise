import Link from "next/link";
import React, { Suspense } from "react";
import StocksCard from "./StocksCard";
import { getStocks } from "@/http";

type Stock = {
  symbol: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  lastPrice: number;
};

async function getStocksData(): Promise<Stock[]> {
  try {
    const response = await getStocks();
    return response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
  return [];
}

async function Stocks() {
  const stocks: Stock[] = await getStocksData();
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-lg font-[500]">
          Most Bought on Tradewise
        </p>
        <Link className="text-sky-700" href="#">
          All stocks
        </Link>
      </div>
      <div className="flex flex-wrap mt-5 justify-between">
        <Suspense fallback={<div>Loading...</div>}>
          {stocks.map((index) => (
            <StocksCard
              key={index.symbol}
              symbol={index.symbol}
              name={index.name}
              imageUrl={index.imageUrl}
              price={index.price}
              quantity={index.quantity}
              lastPrice={index.lastPrice}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

export default Stocks;
