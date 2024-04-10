"use client";
import {
  Building,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Receipt,
  ReceiptText,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { useAuth } from "@/store/authContext";
import Link from "next/link";

export default function UserAvatar() {
  const { authState } = useAuth();
  const id = authState.user?.userID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuLabel className="bg-[#F8F8F8] p-5">
          <div className="flex items-center gap-x-5">
            <Image
              src={authState.user?.profileImgUrl || ""}
              alt="Shad"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-md font-normal">
                {authState.user?.first_name}
                {authState.user?.last_name}
              </h1>
              <p className="text-sm font-normal text-textGray">
                {authState.user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="text-textGray">
          <Link href={`/profile/user/basic-details`}>
            <DropdownMenuItem className="p-3">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="p-3">
            <Building className="mr-2 h-4 w-4" />
            <span>Bank and AutoPay</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3">
            <ReceiptText className="mr-2 h-4 w-4" />
            <span>Watchlist</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-3">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
