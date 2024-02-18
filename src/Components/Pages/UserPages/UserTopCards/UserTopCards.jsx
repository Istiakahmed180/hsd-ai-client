"use client";
import { AuthContext } from "@/Context/AuthProvider";
import { useContext } from "react";
import { FaDollarSign } from "react-icons/fa";

const UserTopCards = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="grid lg:grid-cols-4 p-4 ">
      <div
        className="lg:col-span-2 col-span-1 bg-white flex justify-between items-center w-full border p-4 rounded-lg 
        "
      >
        <div className=" w-full">
          <p className="font-bold text-2xl text-center">Total Transaction</p>
          <p className="text-3xl font-bold justify-center flex items-center text-blue-500">
            <FaDollarSign className="" />
            {user?.totalBalance}
          </p>
        </div>
      </div>
      <div
        className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg
         "
      >
        <div className="flex flex-col w-full pb-4 mt-5">
          <p className="font-bold text-2xl text-center">Current Transaction</p>
          <p className="text-3xl font-bold flex justify-center items-center text-blue-500">
            <FaDollarSign className="" />
            {user?.currentBalance}
          </p>
        </div>
      </div>
      <div
        className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg
         "
      >
        <div className="flex flex-col w-full pb-4 mt-5">
          <p className="font-bold text-2xl text-center">Deposit Transaction</p>
          <p className="text-3xl font-bold flex justify-center items-center text-blue-500">
            <FaDollarSign className="" />0
          </p>
        </div>
      </div>
      <div
        className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg
         "
      >
        <div className="flex flex-col w-full pb-4 mt-5">
          <p className="font-bold text-2xl text-center">Withdraw Transaction</p>
          <p className="text-3xl font-bold flex justify-center items-center text-blue-500">
            <FaDollarSign className="" />
            {user?.withdrawalBalance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTopCards;
