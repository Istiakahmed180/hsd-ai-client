"use client";
import Loader from "@/Components/Shared/Loader/Loader";
import { AuthContext } from "@/Context/AuthProvider";
import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import "../../Components/Shared/Styles/LoginComponent/Login.css";
import Cookies from "js-cookie";

const Login = () => {
  const { loading, setLoading, user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    userEmail: "",
    userPassword: "",
    userRequred: "",
  });
  const [userInfoError, setUserInfoError] = useState({
    userRequred: "",
    userEmail: "",
    userPassword: "",
  });

  const router = useRouter();

  const handleUserInfo = async (e) => {
    e.preventDefault();

    if (userInfo.userEmail && userInfo.userPassword) {
      setLoading(true);

      const email = userInfo.userEmail;
      const password = userInfo.userPassword;
      setUserInfoError({ ...userInfoError, userRequred: "" });

      const userInfoData = {
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(
          "http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/auth/login",
          userInfoData
        );

        if (response.data.message === "password not Match") {
          setLoading(false);
          setUserInfoError({
            ...userInfoError,
            userRequred: "Password Not Match",
          });
        } else if (response.data.message === "custome error") {
          setLoading(false);
          setUserInfoError({
            ...userInfoError,
            userRequred: "Enter Valid Info",
          });
        } else {
          const token = response.data.data;
          Cookies.set("accessToken", token);
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setUserInfoError({
          ...userInfoError,
          userRequred: "An error occurred. Please try again.",
        });
      }
    } else {
      setUserInfoError({
        ...userInfoError,
        userRequred: "Please Fill Up All Required Fields",
      });
    }
  };

  const handleValidateEamil = (e) => {
    const email = e.target.value;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setUserInfoError({
        ...userInfoError,
        userEmail: "Please Provide Your Valid Email",
      });
      setUserInfo({ ...userInfo, userEmail: "" });
    } else {
      setUserInfoError({ ...userInfoError, userEmail: "" });
      setUserInfo({ ...userInfo, userEmail: e.target.value });
    }
  };

  const handleValidatePassword = (e) => {
    const password = e.target.value;

    if (!/(?=.*[!@#$&*])/.test(password)) {
      setUserInfoError({
        ...userInfoError,
        userPassword: "Ensure the password has one special character",
      });
      setUserInfo({ ...userInfo, userPassword: "" });
    } else if (!/(?=.*[0-9])/.test(password)) {
      setUserInfoError({
        ...userInfoError,
        userPassword: "One numeric value must be used in the password",
      });
      setUserInfo({ ...userInfo, userPassword: "" });
    } else if (!/.{6}/.test(password)) {
      setUserInfoError({
        ...userInfoError,
        userPassword: "Ensure password should be at least 6 characters",
      });
      setUserInfo({ ...userInfo, userPassword: "" });
    } else {
      setUserInfoError({ ...userInfoError, userPassword: "" });
      setUserInfo({ ...userInfo, userPassword: e.target.value });
    }
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="bg-image">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-transparent w-full md:w-2/3 lg:w-1/2 xl:w-1/2 mx-auto rounded-2xl p-10 border-2 border-blue-300">
          <h1 className="text-white text-4xl font-semibold mb-6 text-center">Sign In</h1>
          <form onSubmit={handleUserInfo}>
            <input
              type="email"
              className="block my-5 w-full p-2.5 text-lg bg-[#304894] border-2 border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 placeholder:text-base focus:ring-blue-500"
              placeholder="Enter Your Email"
              required
              onChange={handleValidateEamil}
            />
            {userInfoError?.userEmail && (
              <div className="flex justify-center text-violet-500 my-5 font-semibold">
                <small className="text-base">{userInfoError.userEmail}</small>
              </div>
            )}
            <input
              type="password"
              className="block my-5 w-full p-2.5 text-lg bg-[#304894] border-2 border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-base"
              placeholder="Enter Your Password"
              required
              onChange={handleValidatePassword}
            />
            {userInfoError?.userPassword && (
              <div className="flex justify-center text-violet-500 my-5 font-semibold">
                <small className="text-base">
                  {userInfoError.userPassword}
                </small>
              </div>
            )}
            <button
              type="submit"
              className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 transition duration-300 transform hover:scale-95"
            >
              Sign In
            </button>
          </form>
          {userInfoError?.userRequred && (
            <div className="flex justify-center text-violet-500 font-semibold">
              <small className="text-base">{userInfoError.userRequred}</small>
            </div>
          )}
          <hr className="my-5 border-gray-400" />
          <p className="text-sm text-center text-white">Forgot Password?</p>
          <p className="text-sm text-center text-white my-3">
            Create an Account?{" "}
            <Link href={"/signup"}>
              <span className="text-blue-500">Sign Up!</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
