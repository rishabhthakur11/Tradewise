import Link from "next/link";
import React from "react";
import WatchListItems from "./WatchListItems";

interface StockItem {
  id: number;
  name: string;
  value: number;
  change: number;
  changeType: "positive" | "negative";
}
const watchList: StockItem[] = [
  {
    id: 1,
    name: "Tata Steel",
    value: 169.55,
    change: 0.5,
    changeType: "positive",
  },
  {
    id: 2,
    name: "Reliance power",
    value: 30.55,
    change: 1.5,
    changeType: "negative",
  },
  {
    id: 3,
    name: "Infosys",
    value: 1508.55,
    change: 0.5,
    changeType: "positive",
  },
];

function WatchList() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-lg font-[500]">All WatchList</p>
        <Link className="text-themeBlue" href="#">
          view all
        </Link>
      </div>
      <div className="mt-5">
        <WatchListItems watchList={watchList} />
      </div>
    </div>
  );
}

export default WatchList;
