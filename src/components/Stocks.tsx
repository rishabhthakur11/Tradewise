import Image from "next/image";
import React from "react";
import stocks from "../../public/assets/stocks.webp";

export default function Stocks() {
  return (
    <div className="mt-24">
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
          <div className="md:w-1/2 w-full mb-10 md:mb-0 flex justify-center">
            <Image src={stocks} width={300} height={300} alt="Stocks" />
          </div>
          <div className=" md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center">
            <div>
              <h1 className="text-2xl mb-4 font-semibold text-themeBlue">
                Stocks & Intraday
              </h1>
              <p className="mb-8 leading-relaxed text-textGray text-md">
                At levelUp, you get to learn by doing, Escape tutorials hell by
                solving real-world challenges in our interactive labs, all
                within your browser.
              </p>
            </div>
            <div>
              <h1 className="text-2xl mb-4 font-semibold text-[#8AA6E2]">
                Mutual Funds and SIPs
              </h1>
              <p className="mb-8 leading-relaxed text-textGray text-md">
                Level up your skills with our immersive learning platform and
                discover the transformative impact of hands-on practice.
              </p>
            </div>
            <div>
              <h1 className="text-2xl mb-4 font-semibold text-[#8AA6E2]">
                High Interest Products
              </h1>
              <p className="mb-8 leading-relaxed text-textGray text-md">
                Level up your skills with our immersive learning platform and
                discover the transformative impact of hands-on practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
