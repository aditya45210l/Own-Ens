"use client";
import { useEffect, useState } from "react";
import SearchName from "./SearchName";
import { abi, contractAddr } from "@/constant/constant";
import { readContract } from "wagmi/actions";
import { useAccount, useConfig } from "wagmi";
import NotUserName from "./NotUserName";
import MyName from "./MyName";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const [name, setName] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const config = useConfig();

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      redirect("/");
    }
  }, [isConnected]);


  return (
    <div className="p-6">
      {name && address ? (
        <MyName name={name} address={address} />
      ) : (

      )}
    </div>
  );
};

export default Dashboard;
