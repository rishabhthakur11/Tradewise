import Image from "next/image";
import React from "react";
import stocks from "../../public/assets/wallet.svg";

export default function Wallet() {
  return (
    <div className="relative mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col justify-center">
        <h2 className="text-center text-lg font-semibold leading-8 text-textGray tracking-wider">
          Fast Order Execution
        </h2>
        <div className="mt-10 rounded-full w-12 h-12 bg-[#8AA6E2] flex items-center justify-center text-black font-bold text-xl  mx-auto">
          2
        </div>
        <h2 className="mt-10 text-center text-5xl lg:text-7xl font-bold  leading-12 text-[#8AA6E2] tracking-wider">
          Effortless investing
        </h2>
        <p className="mx-auto max-w-2xl mt-6 text-lg leading-6 text-textGray text-center">
          With Tradewise wallet you can invest in stocks, mutual funds, and
          high-interest products with ease.
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="container mx-auto flex px-8 py-24 md:flex-row flex-col  justify-between">
          <div className="md:w-1/2 w-full mb-10 md:mb-0 flex justify-center md:justify-start">
            <div className="absolute top-0 -z-10 h-full w-full bg-white">
              <div className="absolute bottom-auto right-auto left-0 top-52 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[#8AA6E2] opacity-50 blur-[80px]"></div>
            </div>
            <Image
              src={stocks}
              width={450}
              height={300}
              alt="Stocks"
              objectFit="contain"
            />
          </div>
          <div className=" md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center md:justify-between">
            <p className="text-4xl md:text-6xl font-medium">
              Get a Tradewise Wallet unlike any other
            </p>
            <div>
              <div>
                <h1 className="text-2xl mb-4 font-semibold text-[#8AA6E2] mt-20">
                  Tradewise Wallet
                </h1>
                <p className="mb-8 leading-relaxed text-textGray text-md text-justify">
                  A e-wallet that allows you to invest in stocks, mutual funds,
                  and high-interest products with ease.
                </p>
              </div>
              <div>
                <h1 className="text-2xl mb-4 font-semibold text-[#8AA6E2]">
                  Markets in a snapshot
                </h1>
                <p className="mb-8 leading-relaxed text-textGray text-md text-justify">
                  Simplified enouhg for beginners, powerful enough for experts.
                </p>
              </div>
              <div>
                <h1 className="text-2xl mb-4 font-semibold text-[#8AA6E2]">
                  Fast order exexution
                </h1>
                <p className="mb-8 leading-relaxed text-textGray text-md text-justify">
                  Never miss the market move. <br></br>
                  Place order in a breeze.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
