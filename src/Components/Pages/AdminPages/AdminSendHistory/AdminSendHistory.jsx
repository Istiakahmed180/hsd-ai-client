"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaDollarSign } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const AdminSendHistory = () => {
  const [sendingData, setSendingData] = useState([]);
  const [modalSendingData, setModalSendingData] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const formatedModalDate = new Date(
    modalSendingData?.sendingDateAndTime
  ).toLocaleDateString();
  const formatedModalTime = new Date(
    modalSendingData?.sendingDateAndTime
  ).toLocaleTimeString();

  const handleDeleteData = async (id) => {
    try {
      const deletingData = await axios.delete(
        `http://13.229.77.43/api/send/delete-send-history/${id}`
      );
      const data = await deletingData.data;
      const filter = sendingData?.filter((data) => data?._id !== id);
      setSendingData(filter);

      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const getAllSendingHistory = await axios.get(
          "http://13.229.77.43/api/send/all-send-history"
        );
        const data = getAllSendingHistory.data;
        setTimeout(() => {
          setSendingData(data?.data);
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
        <h1 className="text-2xl font-medium">Sending History</h1>
      </div>
      <div className="mt-6">
        <div className="relative overflow-x-auto ">
          <table className="w-full text-sm text-left ">
            {sendingData.length ? (
              <thead className="  uppercase ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-white ">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Sender Name/Email
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
                  <th scope="col" className="px-6 py-3 text-white">
                    Action
                  </th>
                </tr>
              </thead>
            ) : null}
            {sendingData?.length ? (
              sendingData?.map((data, index) => {
                const formatedDate = new Date(
                  data?.sendingDateAndTime
                ).toLocaleDateString();
                const formatedTime = new Date(
                  data?.sendingDateAndTime
                ).toLocaleTimeString();

                return (
                  <tbody key={data?._id}>
                    <tr className="bg-white border-b ">
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3 flex items-center space-x-3">
                        <Image
                          src={data?.image}
                          className="rounded-full w-10 h-10"
                          alt=""
                          width={60}
                          height={60}
                        />
                        <div>
                          <p className="text-lg">{data?.name}</p>
                          <p className="text-gray-400">{data?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={data?.receiverImage}
                            className="rounded-full w-10 h-10"
                            alt=""
                            width={60}
                            height={60}
                          />
                          <div>
                            <p className="text-lg">{data?.recevierName}</p>
                            <p className="text-gray-400">
                              {data?.receiverEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-orange-500 font-semibold ">
                        ${data?.sendAmount}
                      </td>
                      <td
                        className="px-6 py-3 text-green-500 font-medium"
                        onClick={() => setModalSendingData(data)}
                      >
                        <button
                          type="button"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs   px-2 py-2 text-center transition duration-500 ease-in-out transform hover:scale-105 w-14"
                          onClick={() => setModal(true)}
                        >
                          Check
                        </button>
                      </td>
                      <td className="px-6 py-3 text-green-500 font-medium">
                        <button
                          type="button"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2 text-center transition duration-500 ease-in-out transform hover:scale-105 w-14"
                          onClick={() => handleDeleteData(data?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <div>
                <p className="text-center font-semibold text-red-500 mt-20 text-2xl">
                  Sending History Not Available
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
                  Name : {modalSendingData?.name}
                </h3>

                <button
                  className="  w-10 h-10 font-bold cursor-pointer"
                  onClick={() => setModal(false)}
                >
                  <ImCross className="w-4 h-4 text-red-700" />
                </button>
              </div>
              <div className="flex justify-between space-x-8 my-5 text-gray-300 ">
                <Image
                  src={modalSendingData?.image}
                  width={150}
                  height={150}
                  alt="Client Image"
                  className="rounded-3xl"
                ></Image>
                <div>
                  <div>
                    <span className="text-sm">From :</span>{" "}
                    <span>{modalSendingData?.email}</span>
                  </div>
                  <div>
                    <span className="text-sm">To :</span>{" "}
                    <span className="font-semibold">
                      {modalSendingData?.receiverEmail}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Receiver Name : </span>
                    <span className="font-semibold">
                      {modalSendingData?.recevierName}
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
                      {modalSendingData?.sendAmount}
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

export default AdminSendHistory;
