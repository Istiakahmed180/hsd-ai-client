"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RecentUsers = () => {
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.229.77.43/api/auth/recent-users")
      .then((res) => {
        setRecentUsers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1 className="text-2xl font-bold mb-4">Recent Users</h1>
      <ul>
        {recentUsers?.map((user, index) => {
          return (
            <li
              key={user?._id}
              className="bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer transition duration-300 hover:bg-gray-200"
            >
              <div className="flex items-center">
                <div>
                  <Image
                    src={user?.image}
                    alt="User Avatar"
                    width={45}
                    height={45}
                    className="rounded-full w-12 h-12"
                  ></Image>
                </div>
                <div className="pl-4">
                  <p className="text-lg font-medium">{`${user?.firstName} ${user?.lastName}`}</p>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentUsers;
