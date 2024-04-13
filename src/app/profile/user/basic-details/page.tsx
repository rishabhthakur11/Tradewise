"use client";
import { useAuth } from "@/store/authContext";
import React from "react";

type Props = {};

function BasicDetails({}: Props) {
  const { authState } = useAuth();
  const date = new Date(authState.user?.dateOfBirth as string);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  const formattedDate = `${day}-${month}-${year}`;
  return (
    <div className=" w-full h-fit border bg-white rounded-md">
      <div className="p-10">
        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          <div className="gap-y-3 flex flex-col">
            <p className="text-slate-500 text-md">Name</p>
            <p className="text-lg border-b-2 text-lg">
              {authState.user?.first_name.toUpperCase() +
                " " +
                authState.user?.last_name.toUpperCase()}
            </p>
          </div>
          <div className="gap-y-3 flex flex-col">
            <p className="text-slate-500 text-md">Email</p>
            <p className="text-lg border-b-2">{authState.user?.email}</p>
          </div>
          <div className="gap-y-3 flex flex-col">
            <p className="text-slate-500 text-md">User ID</p>
            <p className="text-lg border-b-2">{authState.user?.userID}</p>
          </div>
          <div className="gap-y-3 flex flex-col">
            <p className="text-slate-500 text-md">Date if Birth (DD-MM-YYYY)</p>
            <p className="text-lg border-b-2">{formattedDate}</p>
          </div>
          <div className="gap-y-3 flex flex-col">
            <p className="text-slate-500 text-md">Phone Number</p>
            <p className="text-lg border-b-2">{authState.user?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;
