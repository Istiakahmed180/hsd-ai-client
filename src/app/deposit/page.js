"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import { AuthContext } from "@/Context/AuthProvider";
import axios from "axios";
import moment from "moment/moment";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaDollarSign } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Deposit = () => {
  const [modal, setModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [depositData, setDepositData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDate = moment().format("YYYY-MM-DD");

  const handleWithdrawDeposit = async (id) => {
    try {
      const withdrawAmount = await axios.put(
        `http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/deposit/withdraw-deposit-money?id=${id}`
      );
      const data = await withdrawAmount.data;
      if (data?.type === true) {
        toast.success(data?.message);
      } else {
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelDeposit = (e) => {
    e.preventDefault();

    const userData = {
      name: user?.firstName + " " + user?.lastName,
      email: user?.email,
      image: user?.image,
      phone: user?.phone,
      address: user?.address,
      gender: user?.gender,
      amount: parseFloat(e.target.amount.value),
      bio: user?.bio,
      depositTotalBalance: 0,
      depositCurrentBalance: 0,
    };
    sendingDepositData(userData);
  };

  const sendingDepositData = async (userData) => {
    try {
      const sendData = await axios.post(
        "http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/deposit/add-deposit-transaction",
        userData
      );
      const data = await sendData.data;
      if (data.type === true) {
        toast.success(data.message);
        setModal(false);
      } else {
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userDepositData = await axios.get(
          `http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/deposit/get-deposit-transaction?email=${user?.email}`
        );
        const data = await userDepositData.data;
        setTimeout(() => {
          setDepositData(data?.data);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.log(err);
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
      <div className="flex justify-between items-center mb-6 border-b pb-5">
        <h1 className="text-2xl font-bold text-gray-900">Deposit Money</h1>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setModal(true)}
        >
          <FaDollarSign className="mr-2" />
          <span>Deposit</span>
        </button>
      </div>
      {depositData?.length ? (
        depositData?.map((item, index) => {
          const formatedDate = moment(item?.withdrawDate).format("YYYY-MM-DD");

          return (
            <div
              key={item?._id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 my-3"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold mt-2">
                  Amount : ${item?.amount}
                </p>
                <p
                  className={`${
                    moment(formatedDate).isBefore(currentDate)
                      ? " text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  } text-sm mt-2`}
                >
                  Withdraw Date : {formatedDate}
                </p>

                {item?.depositAmount ? (
                  <button
                    className={`bg-gradient-to-br from-green-600 to-emerald-500 text-white  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 text-center transition duration-500 ease-in-out transform hover:scale-105`}
                    disabled
                  >
                    Complete
                  </button>
                ) : (
                  <button
                    className={`${
                      moment(formatedDate).isBefore(currentDate)
                        ? "bg-gradient-to-br from-green-600 to-emerald-500"
                        : "bg-gradient-to-br from-red-600 to-pink-500"
                    } text-white  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 text-center transition duration-500 ease-in-out transform hover:scale-105`}
                    disabled={
                      moment(formatedDate).isBefore(currentDate) ? false : true
                    }
                    onClick={() => handleWithdrawDeposit(item?._id)}
                  >
                    Withdraw Now
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="my-20">
          <p className="text-red-500 font-bold text-2xl text-center">
            Deposit Money Information Not Available
          </p>
        </div>
      )}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50  text-white">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className=" bg-[#05003B] w-1/2 rounded-2xl shadow-lg z-50">
            <div className="py-6 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <h3 className="text-2xl font-bold mt-3 text-white">
                  Add Your Money
                </h3>

                <button
                  className="  w-10 h-10 font-bold cursor-pointer"
                  onClick={() => setModal(false)}
                >
                  <ImCross className="w-4 h-4 text-red-700" />
                </button>
              </div>
              <hr className="my-5 border-[#36325F]" />
              <form onSubmit={handelDeposit}>
                <div className="my-5">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-lg font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
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
                    Deposit Money
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
