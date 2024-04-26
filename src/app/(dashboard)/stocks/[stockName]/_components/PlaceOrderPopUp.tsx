import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import orderPlaced from "../../../../../../public/assets/PlaceOrder.svg";
import { Separator } from "@/components/ui/separator";

type PopoverProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PlaceOrderPopUp({ isOpen, onClose }: PopoverProps) {
  const popoverStyle = isOpen ? "block" : "hidden";

  return (
    <>
      {/* Overlay with blurred background */}
      <div
        className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ${popoverStyle}`}
        onClick={onClose}
      ></div>

      {/* Popover content */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-md px-10 py-10 ${popoverStyle} w-1/2 h-fit`}
      >
        <div className="flex flex-col items-center gap-y-5">
          <Image src={orderPlaced} alt="stock" width={250} height={250} />
          <h1 className="text-xl font-normal text-center">Order Placed !</h1>
          <Separator />
          <div>
            <p className="text-center text-sm text-textGray">
              Your order has been placed successfully.
            </p>
            <p className="text-center text-sm text-textGray">
              You can check the status of your order in the Investment section.
            </p>
          </div>
          <Separator />
          <Button onClick={onClose} className="mt-2 w-3/4 bg-sky-700">
            DONE
          </Button>
        </div>
      </div>
    </>
  );
}
