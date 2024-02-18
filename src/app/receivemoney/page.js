"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import { AuthContext } from "@/Context/AuthProvider";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const ReceiveMoney = () => {
  const [receiveHistoryData, setReceiveHistoryData] = useState([]);
  const [modalHistoryData, setModalHistoryData] = useState({});
  const [checkingModal, setCheckingModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const formatedModalDate = new Date(
    modalHistoryData?.receiveDateAndTime
  ).toLocaleDateString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userReceiveHistoryData = await axios.get(
          `http://13.229.77.43/api/received/get-user-receive-history?email=${user?.email}`
        );
        const data = await userReceiveHistoryData.data;
        setTimeout(() => {
          setReceiveHistoryData(data?.data);
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
      <div className="bg-blue-900 text-white px-6 py-4 rounded-tl-2xl rounded-tr-2xl">
        <h1 className="text-2xl font-medium">Receiving</h1>
      </div>
      <div className="mt-6">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left ">
            {receiveHistoryData.length ? (
              <thead className="  uppercase ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-white ">
                    S/N
                  </th>

                  <th scope="col" className="px-6 py-3 text-white">
                    Sender Name/Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Receiving
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    History
                  </th>
                </tr>
              </thead>
            ) : null}
            {receiveHistoryData.length ? (
              receiveHistoryData?.map((history, index) => {
                return (
                  <tbody key={history?._id}>
                    <tr className="bg-white border-b ">
                      <td className="px-6 py-3">{index + 1}</td>

                      <td className="px-6 py-3 flex items-center space-x-3">
                        <Image
                          src={history?.senderImage}
                          className="rounded-full "
                          width={45}
                          height={45}
                          alt=""
                        />
                        <div>
                          <p className="text-lg">{history?.senderName}</p>
                          <p className="text-gray-400">
                            {history?.senderEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-orange-500 font-semibold ">
                        ${history?.receiveAmount}
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
                <p className="text-red-500 text-center my-20 text-2xl font-semibold">
                  Receive Money Information Not Available
                </p>
              </div>
            )}
          </table>
        </div>
      </div>
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
                    <span>{modalHistoryData?.senderEmail}</span>
                  </div>
                  <div>
                    <span className="text-sm">To :</span>{" "}
                    <span className="font-semibold">
                      {modalHistoryData?.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Receiver Name : </span>
                    <span className="font-semibold">
                      {modalHistoryData?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Receiving Date : </span>
                    <span>{formatedModalDate}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    <span className="text-sm">Receiving Amount : </span>
                    <span className="flex items-center font-semibold">
                      <FaDollarSign />
                      {modalHistoryData?.receiveAmount}
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

export default ReceiveMoney;
