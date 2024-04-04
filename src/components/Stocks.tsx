import Image from "next/image";
import React from "react";
import stocks from "../../public/assets/stocks.webp";

export default function Stocks() {
  return (
    <div className="mt-52">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col justify-center">
        <h2 className="text-center text-lg font-semibold leading-8 text-textGray tracking-wider">
          EXPLORE THE TRADEWISE WAY
        </h2>
        <div className="mt-10 rounded-full w-12 h-12 bg-themeBlue flex items-center justify-center text-black font-bold text-xl  mx-auto">
          1
        </div>
        <h2 className="mt-10 text-center text-5xl lg:text-7xl font-bold  leading-12 text-themeBlue tracking-wider">
          Indian Stock Market
        </h2>
        <p className="mx-auto max-w-2xl mt-6 text-lg leading-6 text-textGray text-center">
          Long-term or short-term, high risk or low risk. Be the kind of
          investor you want to be.
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="container mx-auto flex px-8 py-24 md:flex-row flex-col  justify-between">
          <div className="md:w-1/2 w-full mb-10 md:mb-0 flex justify-center md:justify-start">
            <Image src={stocks} width={300} height={300} alt="Stocks" />
          </div>
          <div className=" md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center md:justify-between">
            <p className="text-4xl md:text-6xl font-medium">
              Indian Stock market at your fingertips.
            </p>
            <div>
              <div>
                <h1 className="text-2xl mb-4 font-semibold text-themeBlue mt-20">
                  Stocks & Intraday
                </h1>
                <p className="mb-8 leading-relaxed text-textGray text-md text-justify">
                  At Tradewise, you can invest in stocks and intraday trading
                  with ease. We provide you with the tools and resources to make
                  informed decisions.
                </p>
              </div>
              <div>
                <h1 className="text-2xl mb-4 font-semibold text-themeBlue">
                  Mutual Funds and SIPs
                </h1>
                <p className="mb-8 leading-relaxed text-textGray text-md text-justify">
                  Invest in mutual funds and SIPs with Tradewise. We offer a
                  diverse range of mutual funds to help you achieve your
                  financial goals.
                </p>
              </div>
              <div>
                <h1 className="text-2xl mb-4 font-semibold text-themeBlue">
                  High Interest Products
                </h1>
                <p className="mb-8 leading-relaxed text-textGray text-md text-justify">
                  Invest in high-interest products with Tradewise. We offer a
                  diverse range of high-interest products to help you achieve
                  your financial goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
