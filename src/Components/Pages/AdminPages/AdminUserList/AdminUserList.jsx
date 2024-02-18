"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import { AuthContext } from "@/Context/AuthProvider";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const AdminUserList = () => {
  const [modal, setModal] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [checkUser, setCheckUser] = useState({});
  const [loading, setLoading] = useState(true);
  const dateString = checkUser?.date;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();
  const { user } = useContext(AuthContext);

  const handleUsersDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/auth/delete-user/${id}`
      );
      const data = await response.data;
      if (data.success) {
        const updateClient = allUser?.filter((client) => client?._id !== id);
        setAllUser(updateClient);
        toast.success(data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/auth/all-users")
      .then((res) => {
        setTimeout(() => {
          setAllUser(res.data.users);
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <div className="bg-blue-900 text-white px-6 py-4 rounded-tl-2xl rounded-tr-2xl">
        <h1 className="text-2xl font-medium">Users List</h1>
      </div>
      <div className="mt-6">
        <table className="min-w-full ">
          {allUser?.length ? (
            <thead>
              <tr className="">
                <th className="py-3 px-6 border-b text-white font-bold">S/N</th>
                <th className="py-3 px-6 border-b text-white font-bold">
                  Name
                </th>
                <th className="py-3 px-6 border-b text-white font-bold">
                  Email
                </th>
                <th className="py-3 px-6 border-b text-white font-bold">
                  Total Balance
                </th>
                <th className="py-3 px-6 border-b text-white font-bold">
                  Joining Date
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
            {allUser?.length ? (
              allUser?.map((client, index) => {
                const dateString = client?.date;
                const date = new Date(dateString);
                const formattedDate = date.toLocaleDateString();

                return (
                  <tr key={client?._id}>
                    <td className="py-4 pl-11 border-b text-white">
                      {index + 1}
                    </td>
                    <td className="py-4 pl-12 border-b text-white">
                      {client?.firstName && client?.lastName
                        ? client?.firstName + " " + client?.lastName
                        : "No Information"}
                    </td>
                    <td className="py-4 pl-14 border-b text-white">
                      {client?.email ? client?.email : "No Information"}
                    </td>
                    <td className="py-4 pl-12 border-b text-white">
                      <div className="flex items-center text-orange-500 font-semibold">
                        <FaDollarSign />
                        <span>
                          {client?.totalBalance ? client?.totalBalance : "0"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pl-12 border-b text-white">
                      {formattedDate}
                    </td>
                    <td className="py-4 pl-12 border-b text-white">
                      <span className="text-green-500">Active</span>
                    </td>
                    <td className="py-4 pl-11 border-b text-white">
                      <div className="flex items-center gap-x-6">
                        <button
                          className="text-yellow-500 transition-colors duration-200 focus:outline-none"
                          onClick={() => setCheckUser(client)}
                        >
                          <BsEye
                            className="text-xl"
                            onClick={() => setModal(true)}
                          ></BsEye>
                        </button>
                        <button
                          className="text-red-500 transition-colors duration-200 focus:outline-none"
                          onClick={() => handleUsersDelete(client?._id)}
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
                <p className="text-red-500 text-center text-2xl font-semibold mt-20">
                  Users Information Not Available
                </p>
              </div>
            )}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50  text-white">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className=" bg-[#05003B] w-1/2 rounded-2xl shadow-lg z-50">
            <div className="py-6 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <h3 className="text-2xl font-bold mt-3 text-white">
                  Name :{" "}
                  {checkUser?.firstName && checkUser?.lastName
                    ? checkUser?.firstName + " " + checkUser?.lastName
                    : "No Information"}
                </h3>

                <button
                  className="  w-10 h-10 font-bold cursor-pointer"
                  onClick={() => setModal(false)}
                >
                  <ImCross className="w-4 h-4 text-red-700" />
                </button>
              </div>
              <div className="flex justify-between space-x-8 my-5">
                <Image
                  src={checkUser?.image}
                  width={150}
                  height={150}
                  alt="Client Image"
                  className="rounded-3xl"
                ></Image>
                <p className="text-justify">
                  {checkUser?.bio ? checkUser?.bio : "No Information"}
                </p>
              </div>
              <hr className="my-5 border-[#36325F]" />
              <div className="px-20">
                <div className="flex justify-between text-xl my-5">
                  <h1>Total Balance : </h1>

                  <div className="flex items-center text-orange-500 font-semibold">
                    <FaDollarSign />
                    <span>
                      {checkUser?.totalBalance ? checkUser?.totalBalance : "0"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-xl my-5">
                  <h1>Current Balance : </h1>

                  <div className="flex items-center text-orange-500 font-semibold">
                    <FaDollarSign />
                    <span>
                      {checkUser?.currentBalance
                        ? checkUser?.currentBalance
                        : "0"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-xl my-5">
                  <h1>Phone : </h1>

                  <span>
                    {checkUser?.phone ? checkUser?.phone : "No Information"}
                  </span>
                </div>
                <div className="flex justify-between text-xl my-5">
                  <h1>Date : </h1>

                  <span>{formattedDate}</span>
                </div>
                <div className="flex justify-between text-xl my-5">
                  <h1>Gender : </h1>

                  <span>
                    {checkUser?.gender ? checkUser?.gender : "No Information"}
                  </span>
                </div>
                <div className="flex justify-between text-xl my-5">
                  <h1>Address : </h1>

                  <span>
                    {checkUser?.address ? checkUser?.address : "No Information"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
