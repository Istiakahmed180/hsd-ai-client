"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import { AuthContext } from "@/Context/AuthProvider";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaDollarSign } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const WithdrawMoney = () => {
  const [withdrawData, setWithdrawData] = useState([]);
  const [modal, setModal] = useState(false);
  const [checkingModal, setCheckingModal] = useState(false);
  const [checkingData, setCheckingData] = useState({});
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const handleWithdrawRequest = (e) => {
    e.preventDefault();

    const userInfo = {
      name: user?.firstName + " " + user?.lastName,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      gender: user?.gender,
      bio: user?.bio,
      amount: parseFloat(e.target.amount.value),
      image: user?.image,
    };
    sendWithdrawRequest(userInfo);
  };

  const sendWithdrawRequest = async (userInfo) => {
    try {
      const saveWithdrawRequest = await axios.post(
        "http://13.229.77.43/api/withdraw/add-withdraw-request",
        userInfo
      );
      const data = await saveWithdrawRequest.data;
      if (data?.type === true) {
        toast.success(data?.message);
        setModal(false);
      } else {
        return toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userWithdrawHistory = await axios.get(
          `http://13.229.77.43/api/withdraw/get-user-withdraw-history?email=${user?.email}`
        );
        const data = await userWithdrawHistory.data;
        setTimeout(() => {
          setWithdrawData(data?.data);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Withdraw Money</h1>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setModal(true)}
        >
          <FaDollarSign className="mr-2" />
          <span>Withdraw Money</span>
        </button>
      </div>
      <div className="bg-blue-900 text-white px-6 py-4 rounded-tl-2xl rounded-tr-2xl">
        <h1 className="text-xl font-medium">Withdraw</h1>
      </div>
      <div className="mt-6">
        {withdrawData?.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {withdrawData?.map((data, index) => {
              const formatedDate = new Date(data?.date).toLocaleDateString();

              return (
                <div
                  key={data?._id}
                  className="p-4 bg-white rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {data?.name}
                    </h3>
                    <div onClick={() => setCheckingData(data)}>
                      <button
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-1.5 text-center transition duration-500 ease-in-out transform hover:scale-105"
                        onClick={() => setCheckingModal(true)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600">{formatedDate}</p>
                  <p className="text-lg font-bold mt-2">
                    Withdraw Money : ${data?.withdrawAmount}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="text-center text-red-500 font-semibold text-2xl mt-20">
              Your Withdraw Information Not Available
            </p>
          </div>
        )}
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50  text-white">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className=" bg-[#05003B] w-1/2 rounded-2xl shadow-lg z-50">
            <div className="py-6 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <h3 className="text-2xl font-bold mt-3 text-white">
                  Withdraw Money
                </h3>

                <button
                  className="  w-10 h-10 font-bold cursor-pointer"
                  onClick={() => setModal(false)}
                >
                  <ImCross className="w-4 h-4 text-red-700" />
                </button>
              </div>
              <hr className="my-5 border-[#36325F]" />
              <form onSubmit={handleWithdrawRequest}>
                <div className="my-5">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-lg font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder={user?.email}
                    readOnly
                  />
                </div>
                <div className="my-5">
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-lg font-medium text-white"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter Your Amount"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-br w-64 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition duration-500 ease-in-out transform  hover:scale-105"
                  >
                    Withdraw
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {checkingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-white bg-gradient-to-br from-purple-600 via-[#05003B] to-blue-900">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-[#05003B] w-1/2 rounded-2xl shadow-lg z-50">
            <div className="py-6 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <h3 className="text-3xl font-bold mt-3 text-white">
                  Name: {checkingData?.name}
                </h3>

                <button
                  className="w-10 h-10 font-bold cursor-pointer bg-transparent transition-colors duration-300 hover:text-red-700"
                  onClick={() => setCheckingModal(false)}
                >
                  <ImCross className="w-6 h-6" />
                </button>
              </div>
              <div className="flex justify-between space-x-8 my-5 text-gray-300">
                <Image
                  src={checkingData?.image}
                  width={150}
                  height={150}
                  alt="Client Image"
                  className="rounded-3xl"
                ></Image>
                <div>
                  <div className="flex">
                    <span className="">You Got Money: </span>
                    <span className="flex items-center font-semibold text-yellow-500">
                      <FaDollarSign />
                      {checkingData?.amount}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="">Admin Recieved: </span>
                    <span className="flex items-center font-semibold text-yellow-500">
                      <FaDollarSign />
                      {parseFloat(checkingData?.deductionPercentAmount).toFixed(
                        2
                      )}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="">Total Transaction: </span>
                    <span className="flex items-center font-semibold text-yellow-500">
                      <FaDollarSign />
                      {user?.totalBalance}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="">Current Transaction: </span>
                    <span className="flex items-center font-semibold text-yellow-500">
                      <FaDollarSign />
                      {user?.currentBalance}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="">Withdraw Transaction: </span>
                    <span className="flex items-center font-semibold text-yellow-500">
                      <FaDollarSign />
                      {checkingData?.withdrawAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
