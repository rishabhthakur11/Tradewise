"use client";
import React, { useEffect, useState } from "react";
import Indexes from "../../_component/Indexes";
import Holdings from "../../_component/Holdings";
import { useAuth } from "@/store/authContext";
import { getUserPortfolio } from "@/http";
import APIResponseType from "@/utils/interfaces/response";
import DataTable from "./_components/DataTable";
import { columns } from "./_components/Columns";

type Props = {};

function UserStockPortfolio({}: Props) {
  const [userPortfolio, setUserPortfolio] = useState<any[]>([]);
  const { authState } = useAuth();
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await getUserPortfolio({
          userID: authState.user?._id,
        });
        const { success }: APIResponseType = response;
        if (success) {
          setUserPortfolio(response.data);
        }
      } catch (error) {}
    };
    fetchStocks();
  }, [authState.user?._id]);

  return (
    <div className="flex gap-x-16">
      {/* left side  */}
      <div className="w-[65%]">
        <div>
          <Indexes />
        </div>
        <div className="mt-10">
          <Holdings />
        </div>
        <DataTable columns={columns} data={userPortfolio} />
      </div>
      {/* right side */}
      <div className="w-[35%]">
        <div className="mt-10"></div>
      </div>
    </div>
  );
}

export default UserStockPortfolio;
