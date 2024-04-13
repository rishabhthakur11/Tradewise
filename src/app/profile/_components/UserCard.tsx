"use client";
import { useAuth } from "@/store/authContext";
import Image from "next/image";
import React from "react";
import UserRoutes from "./UserRoutes";

type Props = {};

function UserCard({}: Props) {
  const { authState } = useAuth();

  return (
    <div className="bg-white rounded-md border w-full cursor-pointer">
      <div className="px-4 py-8">
        <div className="flex justify-center items-center flex-col">
          <Image
            src={authState.user?.profileImgUrl || ""}
            alt="Shad"
            width={80}
            height={40}
            className="rounded-full"
          />
          <div>
            <h1 className="text-lg font-normal text-center mt-6">
              {authState.user?.first_name.toUpperCase() + " "}
              {authState.user?.last_name.toUpperCase()}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <UserRoutes />
      </div>
    </div>
  );
}

export default UserCard;
