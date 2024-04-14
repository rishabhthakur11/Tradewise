"use client";
import { Building, LogOut, ReceiptText, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { useAuth } from "@/store/authContext";
import Link from "next/link";
import { Button } from "./ui/button";
import { userlogout } from "@/http";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import APIResponseType from "@/utils/interfaces/response";
import UserType from "@/utils/interfaces/userType";

export default function UserAvatar() {
  const { authState, setAuthenticatedState } = useAuth();
  const id = authState.user?.userID;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await userlogout();
      const { success }: APIResponseType = response;
      if (success) {
        setAuthenticatedState({
          isAuthenticated: false,
          user: {} as UserType,
        });
        toast.success("Logged out successfully");
        router.push("/");
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };
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
          <Button variant="link" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
