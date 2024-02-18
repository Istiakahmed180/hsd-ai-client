"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";

const AdminWithdrawHistory = () => {
  const [approvalWithdrawData, setApprovalWithdrawData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleWithdrawRequestDelete = async (id) => {
    try {
      const deleteWithdrawData = await axios.delete(
        `http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/withdraw/delete-withdraw-approved-request/${id}`
      );
      const data = await deleteWithdrawData.data;

      const filter = approvalWithdrawData?.filter((data) => data?._id !== id);
      setApprovalWithdrawData(filter);

      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const getApprevedWithdrawData = await axios.get(
          "http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/withdraw/get-approve-withdraw-request"
        );
        const data = await getApprevedWithdrawData.data;
        setTimeout(() => {
          setApprovalWithdrawData(data?.data);
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
        <h1 className="text-2xl font-medium">Withdraw History</h1>
      </div>
      <div className="mt-6">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="min-w-full">
            {approvalWithdrawData?.length ? (
              <thead>
                <tr className="">
                  <th className="py-3 px-6 border-b text-white font-bold">
                    S/N
                  </th>
                  <th className="py-3 px-6 border-b text-white font-bold">
                    Name
                  </th>
                  <th className="py-3 px-6 border-b text-white font-bold">
                    Email
                  </th>
                  <th className="py-3 px-6 border-b text-white font-bold">
                    Added Amount
                  </th>
                  <th className="py-3 px-6 border-b text-white font-bold">
                    Date
                  </th>
                  <th className="py-3 px-6 border-b text-white font-bold">
                    Status
                  </th>
                  <th className="py-3 px-6 border-b text-white font-bold">
                    Action
                  </th>
                </tr>
              </thead>
            ) : null}
            <tbody>
              {approvalWithdrawData?.length ? (
                approvalWithdrawData?.map((withdraw, index) => {
                  const dateString = withdraw?.date;
                  const date = new Date(dateString);
                  const formattedDate = date.toLocaleDateString();
                  const formatedTime = date.toLocaleTimeString();
                  return (
                    <tr key={withdraw?._id}>
                      <td className="py-4 pl-11 border-b text-white">
                        {index + 1}
                      </td>
                      <td className="py-4 pl-12 border-b text-white">
                        {withdraw?.name ? withdraw?.name : "No Information"}
                      </td>
                      <td className="py-4 pl-14 border-b text-white">
                        {withdraw?.email ? withdraw?.email : "No Information"}
                      </td>
                      <td className="py-4 pl-12 border-b text-orange-600 font-semibold">
                        <div className="flex items-center">
                          <FaDollarSign />
                          <span>
                            {withdraw?.amount
                              ? withdraw?.amount
                              : "No Information"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pl-12 border-b text-white">
                        {formattedDate ? formattedDate : "No Informatin"}
                      </td>
                      <td className="py-4 pl-12 border-b">
                        <span className="text-green-500 font-semibold ">
                          {withdraw?.approvalStatus}
                        </span>
                      </td>
                      <td className="py-4 pl-11 border-b text-white">
                        <div className="flex items-center gap-x-6">
                          <button
                            className="text-red-500 transition-colors duration-200 focus:outline-none"
                            onClick={() =>
                              handleWithdrawRequestDelete(withdraw?._id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div>
                  <p className="text-center text-2xl text-red-500 mt-20 font-semibold">
                    Withdraw History Not Available
                  </p>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawHistory;
