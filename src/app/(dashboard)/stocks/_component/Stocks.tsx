import Link from "next/link";
import React from "react";
import StocksCard from "./StocksCard";
import tatasteel from "../../../../../public/assets/stock-assets/logos/tata-steel.webp";
import reliancepower from "../../../../../public/assets/stock-assets/logos/reliance-power.webp";
import infosys from "../../../../../public/assets/stock-assets/logos/infosis.webp";
import vedanta from "../../../../../public/assets/stock-assets/logos/vedanta.webp";

type Props = {};

const stocks = [
  {
    id: 1,
    name: "Tata Steel",
    imageUrl: tatasteel,
    value: 169.55,
    change: 0.5,
    changeType: "positive",
  },
  {
    id: 2,
    name: "Reliance power",
    imageUrl: reliancepower,
    value: 30.55,
    change: 1.5,
    changeType: "negative",
  },
  {
    id: 3,
    name: "Infosys",
    imageUrl: infosys,
    value: 1508.55,
    change: 0.5,
    changeType: "positive",
  },
  {
    id: 4,
    name: "Vedanta",
    imageUrl: vedanta,
    value: 334.35,
    change: 0.5,
    changeType: "positive",
  },
];

function Stocks({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-lg font-[500]">
          Most Bought on Tradewise
        </p>
        <Link className="text-sky-700" href="#">
          All Stocks
        </Link>
      </div>
      <div className="flex items-center justify-between mt-5 gap-x-3">
        {stocks.map((index) => (
          <StocksCard
            key={index.id}
            name={index.name}
            imageUrl={index.imageUrl}
            value={index.value}
            change={index.change}
            changeType={index.changeType}
          />
        ))}
      </div>
    </div>
  );
}

export default Stocks;
