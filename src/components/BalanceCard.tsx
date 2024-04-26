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
import { useEffect } from "react";
import { getUserBalance } from "@/http";

export default function BalanceCard() {
  const { balance, setBalance, authState } = useAuth();

  useEffect(() => {
    const fetchUserBalance = async () => {
      const res = await getUserBalance({ _id: authState.user._id });
      setBalance(res.data.balance);
    };
    fetchUserBalance();
  }, []);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href="/profile/user/balance">
          <Wallet strokeWidth={1} size={22} className="text-slate-500" />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-textGray">
              Current Balance
            </h4>
            <p className="text-sm mt-3">
              <span className="text-lg font-normal">
                {formatPrice(Number(balance))}
              </span>
            </p>
            <Link href="/profile/user/balance">
              <div className="flex items-center pt-2 mt-6">
                <Banknote
                  strokeWidth={1}
                  size={22}
                  className="text-slate-500 mr-2"
                />{" "}
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
