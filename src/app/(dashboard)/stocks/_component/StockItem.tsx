import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  stock: any;
};

function StockItem({ stock }: Props) {
  return (
    <>
      <div className="flex itsm-center justify-between">
        <div className="text-sm">{stock.name}</div>
        <div
          className={`${
            stock.changeType == "positive" ? "text-[#0CB387]" : "text-[#EB5B3C]"
          } text-sm`}
        >
          {stock.value} ({stock.change})
        </div>
      </div>
      <Separator className="my-5" />
    </>
  );
}

export default StockItem;
