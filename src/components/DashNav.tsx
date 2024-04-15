"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";

type Props = {};

function DashNavbar({}: Props) {
  const pathname = usePathname();
  const isStocks =
    pathname === "/stocks/user/explore" ||
    pathname === "/stocks/user/investments";

  const isMutualFunds =
    pathname === "/mutual-fund/user/explore" ||
    pathname === "/mutual-fund/user/investments";
  return (
    <div>
      <Navbar />
      <div className="flex gap-x-10 mt-6">
        <Link
          className={cn(
            "text-slate-500 text-lg font-[500]",
            isStocks && "text-sky-700 border-b-2 border-sky-700"
          )}
          href="/stocks/user/explore"
        >
          Stocks
        </Link>
        <Link
          className={cn(
            "text-slate-500 text-lg font-[500]",
            isMutualFunds && "text-sky-700 border-b-2 border-sky-700"
          )}
          href="/mutual-fund/user/explore"
        >
          Mutula Funds
        </Link>
      </div>
    </div>
  );
}

export default DashNavbar;
