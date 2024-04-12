"use client";
import { Banknote, Wallet } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatPrice } from "@/lib/format";
import { useAuth } from "@/store/authContext";
import Link from "next/link";

export default function BalanceCard() {
  const { authState } = useAuth();
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Wallet strokeWidth={1} size={22} className="text-slate-500" />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-textGray">
              Current Balance
            </h4>
            <p className="text-sm mt-3">
              <span className="text-lg font-normal">
                {formatPrice(Number(authState.user?.balance))}
              </span>
            </p>
            <Link href="/profile/user/balance">
              <div className="flex items-center pt-2 mt-6">
                <Banknote size={15} className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-sm text-muted-foreground">
                  Add Balance
                </span>
              </div>
            </Link>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
