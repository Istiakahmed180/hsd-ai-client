"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoNotificationsSharp } from "react-icons/io5";
import Link from "next/link";
import { AuthContext } from "@/Context/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Header = ({ show, setShow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex justify-between items-center py-3 text-white shadow-lg">
      <div className="hidden md:block">
        <div
          className={`toggle-button ${show ? "clicked" : ""} ml-3 `}
          onClick={() => setShow(!show)}
        >
          {show ? (
            <AiOutlineRight size={25} />
          ) : (
            <AiOutlineLeft color="white" size={25} />
          )}
        </div>
      </div>
      <div className="flex items-center ">
        <div className="flex items-center">
          <div className="flex items-center mx-5">
            <div className="relative ">
              <IoNotificationsSharp className="text-xl cursor-pointer hover:text-gray-300" />

              <span className="absolute -top-2 text-xs -right-3 bg-red-500 rounded-lg w-5 h-5 flex justify-center items-center text-white">
                3+
              </span>
            </div>
          </div>
          <div className="w-[1px] h-[30px] bg-gray-300"></div>
        </div>
        <div className="flex items-center space-x-3 mx-5">
          <h2 className="">
            {user?.firstName} {user?.lastName}
          </h2>
          <div className="relative " ref={dropdownRef}>
            <button
              className="relative w-12 h-12 rounded-full bg-gradient-to-r from-[#FC495F] to-[#FFc371] "
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                src={
                  user?.image
                    ? user?.image
                    : "https://img.uxwing.com/wp-content/themes/uxwing/download/peoples-avatars-thoughts/corporate-user-icon.png"
                }
                alt="Avatar Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-blue-800"
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg ">
                <ul className="divide-y divide-gray-200">
                  <Link href={"/profile"}>
                    <li className="py-2 pl-3 pr-4 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </li>
                  </Link>
                  <Link href={"accountsetting"}>
                    <li className="py-2 pl-3 pr-4 hover:bg-gray-100 cursor-pointer">
                      Settings
                    </li>
                  </Link>
                  {user ? (
                    <li
                      className="py-2 pl-3 pr-4 hover:bg-gray-100 cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  ) : (
                    <Link href={"/login"}>
                      <li className="py-2 pl-3 pr-4 hover:bg-gray-100 cursor-pointer">
                        Login
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
