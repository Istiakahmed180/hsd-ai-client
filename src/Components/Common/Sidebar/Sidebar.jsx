import Image from "next/image";
import Logo from "../../../../public/Assets/USA-AI-Treading-Logo.png";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import { BsSendCheck } from "react-icons/bs";
import { GiReceiveMoney, GiProfit } from "react-icons/gi";
import { FaPagelines, FaRegMoneyBillAlt, FaUsers } from "react-icons/fa";
import { BiMoneyWithdraw, BiUser } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiLuggageDepositLine } from "react-icons/ri";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-60 min-h-screen px-5 pt-4 sticky top-0 shadow-lg">
      <Link href={"/"}>
        <div className="flex items-center gap-4">
          <Image
            src={Logo}
            alt="HSD-AI-Logo"
            width={35}
            height={35}
          ></Image>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-[#FC495F] to-[#FFC371] text-transparent bg-clip-text">
              HSD AI
            </h1>
            {user?.role === "admin" && (
              <span className="text-white text-lg">
                <>Admin</>
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Link Nav */}
      <div className="mt-8">
        <ul className="space-y-2">
          {user?.role === "admin" && (
            <Link href={"/sendhistory"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <BsSendCheck></BsSendCheck>{" "}
                <span className="ml-3">Send History</span>
              </li>
            </Link>
          )}
          {user?.role === "user" && (
            <Link href={"/addmoney"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <AiOutlineSend></AiOutlineSend>
                <span className="ml-3">Add Money</span>
              </li>
            </Link>
          )}
          {user?.role === "user" && (
            <Link href={"/sendmoney"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <BsSendCheck></BsSendCheck>{" "}
                <span className="ml-3">Send Money</span>
              </li>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href={"/receivehistory"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <GiReceiveMoney></GiReceiveMoney>{" "}
                <span className="ml-3">Receive History</span>
              </li>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href={"/withdrawhistory"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <BiMoneyWithdraw></BiMoneyWithdraw>
                <span className="ml-3">Withdraw History</span>
              </li>
            </Link>
          )}
          {user?.role === "user" && (
            <Link href={"/receivemoney"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <GiReceiveMoney></GiReceiveMoney>{" "}
                <span className="ml-3">Receive Money</span>
              </li>
            </Link>
          )}
          {user?.role === "user" && (
            <Link href={"/withdrawmoney"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <BiMoneyWithdraw></BiMoneyWithdraw>
                <span className="ml-3">Withdraw Money</span>
              </li>
            </Link>
          )}
          {user?.role === "user" && (
            <Link href={"/deposit"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <RiLuggageDepositLine></RiLuggageDepositLine>{" "}
                <span className="ml-3">My Deposit</span>
              </li>
            </Link>
          )}
          {user?.role === "user" && (
            <Link href={"/userprofit"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <GiProfit></GiProfit> <span className="ml-3">Profit</span>
              </li>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href={"/investrequest"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center ">
                <FaRegMoneyBillAlt></FaRegMoneyBillAlt>{" "}
                <span className="ml-3">Invest Request</span>
              </li>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href={"/withdrawrequest"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center ">
                <BiMoneyWithdraw></BiMoneyWithdraw>
                <span className="ml-3">Withdraw Request</span>
              </li>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href={"/adminprofit"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <GiProfit></GiProfit> <span className="ml-3">Profit</span>
              </li>
            </Link>
          )}
          {user?.role === "user" && (
            <Link href={"/defaultpage"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <FaPagelines></FaPagelines>{" "}
                <span className="ml-3">Default Page</span>
              </li>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href={"/myclient"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <BiUser></BiUser> <span className="ml-3">My Client</span>
              </li>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href={"/myusers"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <FaUsers></FaUsers> <span className="ml-3">My Users</span>
              </li>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href={"/adminsettings"}>
              <li className="text-lg text-gray-300 hover:text-white py-2 flex items-center">
                <FiSettings></FiSettings> <span className="ml-3">Settings</span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
