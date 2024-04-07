"use client";
import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../../public/logo/logo_transparent.png";
import { SearchInput } from "./SearchInput";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bell, ShoppingCart, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {};

function DashNavbar({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isExplore =
    pathname === "/stocks/user/explore" ||
    pathname === "/mutual-fund/user/explore";
  const isInvestment =
    pathname === "/stocks/user/investments" ||
    pathname === "/mutual-fund/user/investments";
  const isStocks =
    pathname === "/stocks/user/explore" ||
    pathname === "/stocks/user/investments";

  const isMutualFunds =
    pathname === "/mutual-fund/user/explore" ||
    pathname === "/mutual-fund/user/investments";
  return (
    <div>
      <div className="flex py-5 items-center">
        {/* leftSide */}
        <div className="flex gap-x-16 text-black  items-center grow">
          <div className="flex gap-x-5 text-black  items-center">
            <Link href="/">
              <div className="flex items-center gap-x-2">
                <Image
                  src={logo}
                  width={50}
                  height={50}
                  alt="Tradewise"
                  priority
                />
                <p className="text-xl font-bold curser-pointer">Tradewise</p>
              </div>
            </Link>
            <Link
              className={cn(
                "text-slate-500 text-sm font-[500]",
                isExplore && "text-sky-700"
              )}
              href="/stocks/user/explore"
            >
              Explore
            </Link>
            <Link
              className={cn(
                "text-slate-500 text-sm font-[500]",
                isInvestment && "text-sky-700"
              )}
              href="/stocks/user/investments"
            >
              investments
            </Link>
          </div>
          <div className="flex gap-x-5 text-lg font-normal hidden lg:flex">
            <Suspense>
              <SearchInput />
            </Suspense>
          </div>
        </div>

        <div>
          <div className="hidden lg:flex gap-x-7 text-lg text-black font-normal items-center">
            <Bell size={20} className="text-slate-500" />
            <Wallet size={20} className="text-slate-500" />
            <ShoppingCart size={20} className="text-slate-500" />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          {/* TODO: Add the side bar here */}
          {/* <div className="lg:hidden text-black relative">
          <div className="z-50">
            {sideBarIcon ? (
              <MenuIcon onClick={manageSideBar} />
            ) : (
              <CloseIcon onClick={manageSideBar} />
            )}
          </div>
          {sideBar ? (
            <div className="bg-white fixed top-0 left-0 w-3/4 md:w-1/2 h-screen  lg:hidden z-50">
              <SideBar />
            </div>
          ) : null}
        </div> */}
        </div>
      </div>
      <div className="flex gap-x-10 mt-10 mb-3">
        <Link
          className={cn(
            "text-slate-500 text-lg font-[500]",
            isStocks && "text-sky-700"
          )}
          href="/stocks/user/explore"
        >
          Stocks
        </Link>
        <Link
          className={cn(
            "text-slate-500 text-lg font-[500]",
            isMutualFunds && "text-sky-700"
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
