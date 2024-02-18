"use client";
import { FaDollarSign } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { AuthContext } from "@/Context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Loader from "@/Components/Shared/Loader/Loader";

const AddMoney = () => {
  const [modal, setModal] = useState(false);
  const [userInvestmentData, setUserInvestmentData] = useState([]);
  const [viewingModal, setViewingModal] = useState(false);
  const [viewingData, setViewingData] = useState({});
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const handleClientData = (e) => {
    e.preventDefault();

    const clientData = {
      name: user?.firstName + " " + user?.lastName,
      email: user?.email,
      image: user?.image,
      phone: user?.phone,
      address: user?.address,
      gender: user?.gender,
      amount: parseFloat(e.target.amount.value),
      bio: user?.bio,
    };

    axios
      .post(
        "http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/invest/add-client",
        clientData
      )
      .then((res) => {
        if (res?.data?.type === true) {
          toast.success(res.data.message);
          setModal(false);
        } else {
          return toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userInvestmentData = await axios.get(
          `http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/invest/get-user-investment-data?email=${user?.email}`
        );
        const data = await userInvestmentData.data;
        setTimeout(() => {
          setUserInvestmentData(data?.data);
          setLoading(false);
        }, 500);
      } catch (error) {
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
        <h1 className="text-2xl font-bold text-gray-900">Invest Money</h1>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setModal(true)}
        >
          <FaDollarSign className="mr-2" />
          <span>Add Amount</span>
        </button>
      </div>

      {userInvestmentData.length ? (
        userInvestmentData?.map((invest, index) => {
          const formatedDate = new Date(invest?.date).toLocaleDateString();

          return (
            <div
              key={invest?._id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 my-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {invest?.name}
                </h3>
                <div onClick={() => setViewingData(invest)}>
                  <button
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 text-center transition duration-500 ease-in-out transform hover:scale-105"
                    onClick={() => setViewingModal(true)}
                  >
                    View
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-2">Date: {formatedDate}</p>
              <p className="text-lg font-bold mt-2">
                Investment Amount: ${invest?.amount}
              </p>
            </div>
          );
        })
      ) : (
        <div className="my-20">
          <p className="text-red-500 font-bold text-2xl text-center ">
            Your Invest Information Not Available
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
              <form onSubmit={handleClientData}>
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
                    Add Money
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {viewingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
          <div
            className="fixed inset-0 bg-gray-500 opacity-75"
            onClick={() => setViewingModal(false)}
          ></div>
          <div className="bg-[#05003B] w-2/3 rounded-lg shadow-lg z-50">
            <div className="py-6 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <h3 className="text-3xl font-bold mt-3 text-white bg-[#05003B] px-4 py-2 rounded-t-lg">
                  Name: {viewingData?.name}
                </h3>
                <button
                  className="w-8 h-8 font-bold cursor-pointer text-xl flex justify-center items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring focus:ring-red-500 focus:bg-red-500 hover:bg-red-500"
                  onClick={() => setViewingModal(false)}
                >
                  <ImCross className="w-8 h-8 text-red-700" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex flex-col items-center">
                  <Image
                    src={viewingData?.image}
                    alt="User"
                    className="rounded-full shadow-md border-4 border-white"
                    width={150}
                    height={150}
                  />
                  <p className="mt-4 text-xl">Email: {viewingData?.email}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <p className="text-xl mr-2">Transaction:</p>
                    <p className="text-2xl flex items-center">
                      <FaDollarSign className="" />
                      {viewingData?.amount}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xl mr-2">Current Transaction:</p>
                    <p className="text-2xl flex items-center">
                      <FaDollarSign className="" />
                      {user?.currentBalance}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xl mr-2">Total Transaction:</p>
                    <p className="text-2xl flex items-center">
                      <FaDollarSign className="" />
                      {user?.totalBalance}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xl mr-2">Date:</p>
                    <p className="text-2xl">
                      {new Date(viewingData?.date).toLocaleString()}
                    </p>
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

export default AddMoney;
