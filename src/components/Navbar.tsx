import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "../../public/logo/logo_transparent.png";
import { SearchInput } from "./SearchInput";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="flex py-5 items-center px-5">
      {/* leftSide */}
      <div className="flex gap-x-24 text-black  items-center grow">
        <Link href="/">
          <div className="flex items-center gap-x-2">
            <Image src={logo} width={50} height={50} alt="Tradewise" priority />
            <p className="text-xl font-bold curser-pointer">Tradewise</p>
          </div>
        </Link>
        <div className="flex gap-x-12 text-lg font-normal hidden lg:flex">
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
      </div>

      <div>
        <div className="hidden lg:flex gap-x-7 text-lg text-black font-normal items-center">
          <Button>
            <p>Login/Register</p>
          </Button>
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
