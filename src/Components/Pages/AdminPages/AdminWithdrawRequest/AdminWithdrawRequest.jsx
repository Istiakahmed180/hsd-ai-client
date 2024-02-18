"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdminWithdrawRequest = () => {
  const [withdrawRequest, setWithdrawRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleApprovedData = async (id) => {
    try {
      const saveApproveRequest = await axios.put(
        `http://13.229.77.43/api/withdraw/admin/approve/${id}`
      );
      const data = await saveApproveRequest.data;
      if (data) {
        const filter = withdrawRequest?.filter((item) => item?._id !== id);
        setWithdrawRequest(filter);

        toast.success(data?.message);

        const profit = {
          name: data?.withdraw?.name,
          email: data?.withdraw?.email,
          image: data?.withdraw?.image,
          phone: data?.withdraw?.phone,
          address: data?.withdraw?.address,
          gender: data?.withdraw?.gender,
          bio: data?.withdraw?.bio,
          vat: data?.withdraw?.deductionPercentAmount,
        };
        adminProfitData(profit);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelDeleteWithdrawRequest = async (id) => {
    try {
      const deleteWithRequest = await axios.delete(
        `http://13.229.77.43/api/withdraw/delete-withdraw-approved-request/${id}`
      );

      const data = await deleteWithRequest.data;

      const filter = withdrawRequest?.filter((data) => data?._id !== id);
      setWithdrawRequest(filter);

      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const adminProfitData = async (profit) => {
    try {
      const saveProfit = await axios.post(
        "http://13.229.77.43/api/profit/add-admin-profit",
        profit
      );
      const data = await saveProfit.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const getWithdrawRequest = await axios.get(
          "http://13.229.77.43/api/withdraw/admin/withdraw-request"
        );
        const data = await getWithdrawRequest.data;
        setTimeout(() => {
          setWithdrawRequest(data?.data);
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
        <h1 className="text-2xl font-medium">Withdraw Request</h1>
      </div>
      <div className="mt-6">
        <div className="overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left">
            {withdrawRequest?.length ? (
              <thead className="uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3 text-white">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Withdraw
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Status
                  </th>
                  <th scope="col" className="px-16 py-3 text-white">
                    Action
                  </th>
                </tr>
              </thead>
            ) : null}
            {withdrawRequest?.length ? (
              withdrawRequest?.map((withdrawData, index) => {
                const dateString = withdrawData?.date;
                const date = new Date(dateString);
                const formatDate = date.toLocaleDateString();

                return (
                  <tbody key={withdrawData?._id}>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-3">{withdrawData?.name}</td>
                      <td className="px-6 py-3">{formatDate}</td>
                      <td className="px-6 py-3 text-yellow-500 font-semibold">
                        ${withdrawData?.amount}
                      </td>
                      <td className="px-6 py-3 text-green-500 font-semibold">
                        {withdrawData?.approvalStatus}
                      </td>
                      <td className="space-x-3 flex items-center justify-start  mt-2 mx-2">
                        <div className="space-x-3">
                          <button
                            type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center transition duration-500 ease-in-out transform hover:scale-105 w-20"
                            onClick={() =>
                              handleApprovedData(withdrawData?._id)
                            }
                          >
                            Approve
                          </button>
                        </div>
                        <div className="w-10 h-10 bg-red-50 hover:bg-red-200 duration-300 transition-all rounded-full flex items-center justify-center cursor-pointer">
                          <button
                            className="text-red-500 transition-colors duration-200 focus:outline-none"
                            onClick={() =>
                              handelDeleteWithdrawRequest(withdrawData?._id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
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
                  </tbody>
                );
              })
            ) : (
              <div>
                <p className="text-center text-red-500 text-2xl font-semibold mt-20">
                  Withdraw Request Information Not Available
                </p>
              </div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawRequest;
