import React from "react";
import StockDetails from "./_components/StockDetails";
import BuyStockForm from "./_components/BuyStockForm";

async function StockDetailsPage({ params }: { params: { stockName: string } }) {
  return (
    <div className="flex gap-x-16">
      {/* left side  */}
      <div className="w-[65%]">
        <div>
          <StockDetails stockName={params.stockName} />
        </div>
        <div className="mt-10"></div>
      </div>
      {/* right side */}
      <div className="w-[35%]">
        <BuyStockForm stockName={params.stockName} />
      </div>
    </div>
  );
}

export default StockDetailsPage;
