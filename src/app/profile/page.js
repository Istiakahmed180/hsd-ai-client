"use client";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "@/Context/AuthProvider";
import Link from "next/link";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto px-6 py-8 bg-[#05003B] min-h-screen">
      <div className="bg-[#140F47] rounded-2xl text-[#CCCBCB] px-6 py-10">
        <div className="flex justify-between text-3xl px-4 font-medium">
          <h1>Profile Information</h1>
          <Link href={"/accountsetting"}>
            <BiEdit className="text-2xl text-white cursor-pointer" />
          </Link>
        </div>
        <hr className="mx-4 my-6 border-[#36325F]" />
        <div className="flex mx-4">
          <div className="flex-1">
            <div className="w-96">
              <div className="flex justify-between">
                <div className="relative rounded-lg h-64 w-64 overflow-hidden">
                  <Image
                    src={user?.image}
                    alt="Profile Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="mt-14">
                <div className="flex justify-between items-center">
                  <p className="text-lg">First Name:</p>
                  <p className="text-white text-lg font-semibold">
                    {user?.firstName && user?.lastName
                      ? user?.firstName + " " + user.lastName
                      : "No Information"}
                  </p>
                </div>
                <hr className="my-5 border-[#36325F]" />
                <div className="flex justify-between items-center">
                  <p className="text-lg">Email Address:</p>
                  <p className="text-white text-lg font-semibold">
                    {user?.email ? user?.email : "No Information"}
                  </p>
                </div>
                <hr className="my-5 border-[#36325F]" />
                <div className="flex justify-between items-center">
                  <p className="text-lg">Phone Number:</p>
                  <p className="text-white text-lg font-semibold">
                    {user?.phone ? user?.phone : "No Information"}
                  </p>
                </div>
                <hr className="my-5 border-[#36325F]" />
                <div className="flex justify-between items-center">
                  <p className="text-lg">Gender:</p>
                  <p className="text-white text-lg font-semibold">
                    {user?.gender ? user?.gender : "No Information"}
                  </p>
                </div>
                <hr className="my-5 border-[#36325F]" />
                <div className="flex justify-between items-center">
                  <p className="text-lg">Address:</p>
                  <p className="text-white text-lg font-semibold">
                    {user?.address ? user?.address : "No Information"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[1px] h-[620px] mx-5 bg-gray-300"></div>
          <div className="w-full">
            <div className="flex text-white justify-between">
              <h1 className="text-4xl font-medium mb-5">About Me</h1>
            </div>
            <span className="text-lg">
              {user?.bio ? user?.bio : "No Information"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
