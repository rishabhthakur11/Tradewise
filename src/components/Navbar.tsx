"use client";
import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../../public/logo/logo_transparent.png";
import { SearchInput } from "./SearchInput";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/store/authContext";
import { Bell, ShoppingCart, Wallet } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";
import BalanceCard from "./BalanceCard";

type Props = {};

function Navbar({}: Props) {
  const pathname = usePathname();
  const isExplore =
    pathname === "/stocks/user/explore" ||
    pathname === "/mutual-fund/user/explore";
  const isInvestment =
    pathname === "/stocks/user/investments" ||
    pathname === "/mutual-fund/user/investments";
  const { authState } = useAuth();
  const router = useRouter();
  return (
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
          {authState.isAuthenticated ? (
            <div className="flex gap-x-5 text-black  items-center">
              <Link
                className={cn(
                  "text-slate-500 text-md font-[400]",
                  isExplore && "text-sky-700"
                )}
                href="/stocks/user/explore"
              >
                Explore
              </Link>
              <Link
                className={cn(
                  "text-slate-500 text-md font-[400]",
                  isInvestment && "text-sky-700"
                )}
                href="/stocks/user/investments"
              >
                Investments
              </Link>
            </div>
          ) : null}
        </div>
        <div className="flex gap-x-12 text-lg font-normal hidden lg:flex">
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
      </div>

      <div>
        <div className="hidden lg:flex gap-x-6 text-lg text-black font-normal items-center">
          {authState.isAuthenticated ? (
            <div className="hidden lg:flex gap-x-8 text-lg text-black font-normal items-center">
              <Bell strokeWidth={1} size={22} className="text-slate-500" />
              <BalanceCard />
              <ShoppingCart
                strokeWidth={1}
                size={22}
                className="text-slate-500"
              />
              <UserAvatar />
            </div>
          ) : (
            <Button onClick={() => router.push("/auth/login")}>
              <p>Login/Register</p>
            </Button>
          )}
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
  );
}

export default Navbar;
