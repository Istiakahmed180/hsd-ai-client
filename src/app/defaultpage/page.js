"use client";
import { AuthContext } from "@/Context/AuthProvider";
import { useContext } from "react";
import { FaDollarSign } from "react-icons/fa";

const DefaultPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <div className="bg-blue-900 text-white px-6 py-4 rounded-tl-2xl rounded-tr-2xl">
        <h1 className="text-2xl font-medium">
          User Name: {user?.firstName} {user?.lastName}
        </h1>
        <p>Email: {user?.email}</p>
      </div>
      <div className="grid grid-cols-3 gap-8 my-10">
        <UserBalance
          text={"Current Transsaction"}
          balance={user?.currentBalance}
        ></UserBalance>
        <UserBalance text={"M--P"} balance={"5.35"}></UserBalance>
        <UserBalance
          text={"Total Transaction"}
          balance={user?.totalBalance}
        ></UserBalance>
        <UserBalance text={"Total Profit"} balance={"5.35"}></UserBalance>
        <UserBalance text={"S.. Transaction"} balance={"5.35"}></UserBalance>
        <UserBalance
          text={"Withdraw Transaction"}
          balance={user?.withdrawalBalance}
        ></UserBalance>
      </div>
    </div>
  );
};

const UserBalance = ({ text, balance }) => {
  return (
    <div className=" text-white">
      <div className="border rounded-2xl py-8 px-5 text-center bg-[#312C61]">
        <h1 className="text-xl">{text}</h1>
        <p className="flex items-center justify-center text-3xl">
          <FaDollarSign className="" />
          <span>{balance}</span>
        </p>
      </div>
    </div>
  );
};

export default DefaultPage;
