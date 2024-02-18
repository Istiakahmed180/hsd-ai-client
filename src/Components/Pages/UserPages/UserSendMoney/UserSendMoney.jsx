"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import { AuthContext } from "@/Context/AuthProvider";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaDollarSign } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const UserSendMoney = () => {
  const [modal, setModal] = useState(false);
  const [checkingModal, setCheckingModal] = useState(false);
  const [userHistoryData, setUserHistoryData] = useState([]);
  const [modalHistoryData, setModalHistoryData] = useState({});
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const formatedModalDate = new Date(
    modalHistoryData?.sendingDateAndTime
  ).toLocaleDateString();

  const handleSendAmount = async (e) => {
    e.preventDefault();

    const sendAmount = {
      senderEmail: user?.email,
      recipientEmail: e.target.email.value,
      amount: parseFloat(e.target.amount.value),
    };

    try {
      const fetchingData = await axios.post(
        `http://13.229.77.43/api/invest/transfer-amount`,
        sendAmount
      );
      const data = await fetchingData.data;
      if (data?.type === true) {
        toast.success(data?.message);
        setModal(false);

        const senderHistoryData = {
          name: data?.sender?.firstName + " " + data?.sender?.lastName,
          recevierName:
            data?.recipient?.firstName + " " + data?.recipient?.lastName,
          email: data?.sender?.email,
          receiverEmail: data?.recipient?.email,
          image: data?.sender?.image,
          receiverImage: data?.recipient?.image,
          totalBalance: parseFloat(data?.sender?.totalBalance),
          currentBalance: parseFloat(data?.sender?.currentBalance),
          sendAmount: parseFloat(data?.sender?.sendAmount),
        };
        handelSendingHistoryData(senderHistoryData);

        const receiverHistoryData = {
          name: data?.recipient?.firstName + " " + data?.recipient?.lastName,
          senderName: data?.sender?.firstName + " " + data?.sender?.lastName,
          email: data?.recipient?.email,
          senderEmail: data?.sender?.email,
          image: data?.recipient?.image,
          senderImage: data?.sender?.image,
          totalBalance: parseFloat(data?.recipient?.totalBalance),
          currentBalance: parseFloat(data?.recipient?.currentBalance),
          receiveAmount: parseFloat(data?.recipient?.receiveAmount),
        };
        handleReceivingHistoryData(receiverHistoryData);
      } else {
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelSendingHistoryData = async (senderHistoryData) => {
    try {
      const fetcingSendingHistory = await axios.post(
        "http://13.229.77.43/api/send/add-send-history",
        senderHistoryData
      );
      const data = await fetcingSendingHistory.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleReceivingHistoryData = async (receiverHistoryData) => {
    try {
      const fetchingReceivingHistory = await axios.post(
        "http://13.229.77.43/api/received/add-receive-data",
        receiverHistoryData
      );
      const data = await fetchingReceivingHistory.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const getUserSendHistory = await axios.get(
          `http://13.229.77.43/api/send/get-user-send-history?email=${user?.email}`
        );
        const data = await getUserSendHistory.data;

        setTimeout(() => {
          setUserHistoryData(data?.data);
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
        <h1 className="text-2xl font-bold text-gray-900">Send Money</h1>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setModal(true)}
        >
          <FaDollarSign className="mr-2" />
          <span>Send Money</span>
        </button>
      </div>
      <div className="bg-blue-900 text-white px-6 py-4 rounded-tl-2xl rounded-tr-2xl">
        <h1 className="text-2xl font-medium">Sending</h1>
      </div>
      <div className="mt-6">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left ">
            {userHistoryData.length ? (
              <thead className="  uppercase ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-white ">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Receiver Name/Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Sending
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    History
                  </th>
                </tr>
              </thead>
            ) : (
              ""
            )}
            {userHistoryData.length ? (
              userHistoryData?.map((history, index) => {
                return (
                  <tbody key={history?._id}>
                    <tr className="bg-white border-b ">
                      <td className="px-6 py-3">{index + 1}</td>

                      <td className="px-6 py-3">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={history?.receiverImage}
                            className="rounded-full "
                            width={45}
                            height={45}
                            alt=""
                          />
                          <div>
                            <p className="text-lg">{history?.recevierName}</p>
                            <p className="text-gray-400">
                              {history?.receiverEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-orange-500 font-semibold ">
                        ${history?.sendAmount}
                      </td>
                      <td
                        className="px-6 py-3 text-green-500 font-medium"
                        onClick={() => setModalHistoryData(history)}
                      >
                        <button
                          type="button"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs   px-2 py-2 text-center transition duration-500 ease-in-out transform hover:scale-105 w-14"
                          onClick={() => setCheckingModal(true)}
                        >
                          Check
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <div>
                <p className="text-center font-bold text-red-500 my-20 text-2xl">
                  Send Money Information Not Available
                </p>
              </div>
            )}
          </table>
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50  text-white">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className=" bg-[#05003B] w-1/2 rounded-2xl shadow-lg z-50">
            <div className="py-6 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <h3 className="text-2xl font-bold mt-3 text-white">
                  Send Money
                </h3>

                <button
                  className="  w-10 h-10 font-bold cursor-pointer"
                  onClick={() => setModal(false)}
                >
                  <ImCross className="w-4 h-4 text-red-700" />
                </button>
              </div>
              <hr className="my-5 border-[#36325F]" />
              <form onSubmit={handleSendAmount}>
                <div className="my-5">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-lg font-medium text-white"
                  >
                    Sender Email
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
                    htmlFor="first_name"
                    className="block mb-2 text-lg font-medium text-white"
                  >
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter Recipient Email"
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
      {checkingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50  text-white">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className=" bg-[#05003B] w-1/2 rounded-2xl shadow-lg z-50">
            <div className="py-6 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <h3 className="text-2xl font-bold mt-3 text-white">
                  Name : {modalHistoryData?.name}
                </h3>

                <button
                  className="  w-10 h-10 font-bold cursor-pointer"
                  onClick={() => setCheckingModal(false)}
                >
                  <ImCross className="w-4 h-4 text-red-700" />
                </button>
              </div>
              <div className="flex justify-between space-x-8 my-5 text-gray-300 ">
                <Image
                  src={modalHistoryData?.image}
                  width={150}
                  height={150}
                  alt="Client Image"
                  className="rounded-3xl"
                ></Image>
                <div>
                  <div>
                    <span className="text-sm">From :</span>{" "}
                    <span>{modalHistoryData?.email}</span>
                  </div>
                  <div>
                    <span className="text-sm">To :</span>{" "}
                    <span className="font-semibold">
                      {modalHistoryData?.receiverEmail}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Receiver Name : </span>
                    <span className="font-semibold">
                      {modalHistoryData?.recevierName}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Sending Date : </span>
                    <span>{formatedModalDate}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    <span className="text-sm">Sending Amount : </span>
                    <span className="flex items-center font-semibold">
                      <FaDollarSign />
                      {modalHistoryData?.sendAmount}
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

export default UserSendMoney;
