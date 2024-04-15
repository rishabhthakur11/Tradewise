import Link from "next/link";
import React from "react";
import WatchListItems from "./WatchListItems";
import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";

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
        <Link className="text-sky-700" href="#">
          View all
        </Link>
      </div>
      <div className="mt-5">
        <WatchListItems watchList={watchList} />
      </div>
      <div className="mt-5">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-sky-700 flex"
        >
          <BookmarkPlus
            strokeWidth={1}
            size={22}
            className="text-slate-500 mr-2"
          />
          create new wishlist
        </Button>
      </div>
    </div>
  );
}

export default WatchList;
