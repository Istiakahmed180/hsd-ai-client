"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaDollarSign } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const AdminReceiveHistory = () => {
  const [receivingData, setReceivingData] = useState([]);
  const [receivingModalData, setModalReceivingData] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const formatedModalDate = new Date(
    receivingModalData?.receiveDateAndTime
  ).toLocaleDateString();

  const handleReceivingDataDelete = async (id) => {
    try {
      const deletetingData = await axios.delete(
        `http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/received/delete-receive-data/${id}`
      );
      const data = await deletetingData.data;

      const filter = receivingData?.filter((data) => data?._id !== id);
      setReceivingData(filter);

      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const GetAllRecievingData = await axios.get(
          "http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/received/all-receive-data"
        );
        const data = await GetAllRecievingData.data;
        setTimeout(() => {
          setReceivingData(data?.data);
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
        <h1 className="text-2xl font-medium">Receiving History</h1>
      </div>
      <div className="mt-6">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left ">
            {receivingData?.length ? (
              <thead className="  uppercase ">
                <tr>
                  <th scope="col" className="px-6 py-3 text-white ">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Receiver Name/Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Sender Name/Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Amount
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
            {receivingData?.length ? (
              receivingData?.map((data, index) => {
                return (
                  <tbody key={data?._id}>
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium  whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-3 flex items-center space-x-3">
                        <Image
                          src={data?.image}
                          className="rounded-full w-10 h-10"
                          alt=""
                          width={40}
                          height={40}
                        />
                        <div>
                          <p className="text-lg">{data?.name}</p>
                          <p className="text-gray-400">{data?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={data?.senderImage}
                            className="rounded-full "
                            alt=""
                            width={40}
                            height={40}
                          />
                          <div>
                            <p className="text-lg">{data?.senderName}</p>
                            <p className="text-gray-400">{data?.senderEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-orange-500 font-semibold ">
                        ${data?.receiveAmount}
                      </td>
                      <td
                        className="px-6 py-3 text-green-500 font-medium"
                        onClick={() => setModalReceivingData(data)}
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
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs   px-2 py-2 text-center transition duration-500 ease-in-out transform hover:scale-105 w-14"
                          onClick={() => handleReceivingDataDelete(data?._id)}
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
                <p className="text-2xl text-center text-red-500 font-semibold mt-20">
                  Receiving History Not Available
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
                  Name : {receivingModalData?.name}
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
                  src={receivingModalData?.image}
                  width={150}
                  height={150}
                  alt="Client Image"
                  className="rounded-3xl"
                ></Image>
                <div>
                  <div>
                    <span className="text-sm">From :</span>{" "}
                    <span>{receivingModalData?.senderEmail}</span>
                  </div>
                  <div>
                    <span className="text-sm">To :</span>{" "}
                    <span className="font-semibold">
                      {receivingModalData?.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">Sender Name : </span>
                    <span className="font-semibold">
                      {receivingModalData?.senderName}
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
                      {receivingModalData?.receiveAmount}
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

export default AdminReceiveHistory;
