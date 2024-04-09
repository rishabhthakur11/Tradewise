"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BadgePlus, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface StockItem {
  id: number;
  name: string;
  value: number;
  change: number;
  changeType: "positive" | "negative";
}
type Props = {
  watchList: StockItem[];
};

function WatchListItems({ watchList }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <ScrollArea className="h-fit w-full rounded-md border">
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-normal leading-none">
                  My Watchlist
                </h1>
                <p className="text-sm text-slate-500 mt-2">
                  {watchList.length} items
                </p>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <Separator className="mt-5 mb-5" />
            <CollapsibleContent>
              {watchList.map((stock, index) => (
                <>
                  <div className="flex itsm-center justify-between">
                    <div className="text-sm">{stock.name}</div>
                    <div
                      className={`${
                        stock.changeType == "positive"
                          ? "text-[#0CB387]"
                          : "text-[#EB5B3C]"
                      } text-sm`}
                    >
                      {stock.value} ({stock.change})
                    </div>
                  </div>
                  <Separator
                    className={index !== watchList.length - 1 ? "my-5" : "mt-5"}
                  />
                </>
              ))}
            </CollapsibleContent>
          </div>
        </ScrollArea>
      </Collapsible>
      <div className="mt-5">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-themeBlue flex"
        >
          <BadgePlus size={25} className="mr-2" />
          create new wishlist
        </Button>
      </div>
    </div>
  );
}

export default WatchListItems;