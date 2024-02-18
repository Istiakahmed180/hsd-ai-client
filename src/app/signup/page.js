"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Shared/Loader/Loader";
import { AuthContext } from "@/Context/AuthProvider";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../../../public/Assets/Avater.png";

const SignUp = () => {
  const { setLoading, loading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userRequred: "",
    userImage: "",
    referenceName: "",
  });

  const [userInfoError, setUserInfoError] = useState({
    userRequred: "",
    userEmail: "",
    userPassword: "",
  });

  const router = useRouter();

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=995d95c9d759ae6e71fca323ad38d2ec",
        formData
      );
      const imageUrl = response.data.data.url;
      setUserInfo({ ...userInfo, userImage: imageUrl });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUserInfo = (e) => {
    e.preventDefault();

    if (userInfo.userEmail && userInfo.userPassword) {
      setLoading(true);

      const firstName = userInfo.userFirstName;
      const lastName = userInfo.userLastName;
      const email = userInfo.userEmail;
      const password = userInfo.userPassword;
      const image = userInfo.userImage;
      const reference = userInfo.referenceName;
      setUserInfoError({ ...userInfoError, userRequred: "" });

      const userInfoData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        image: image,
        totalBalance: 0,
        currentBalance: 0,
        withdrawalBalance: 0,
        role: "user",
        reference: reference,
      };

      axios
        .post(
          "http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/auth/register",
          userInfoData
        )
        .then((res) => {
          if (res.data.message === "Register SuccessFull") {
            setLoading(false);
            router.push("/login");
          }
          if (res.data.message === "custome error") {
            setLoading(false);
            setUserInfoError({
              ...userInfoError,
              userRequred: "Enter Vaild Info",
            });
          }
          if (res.data.message === "User Is Alreay Exist") {
            setLoading(false);
            setUserInfoError({
              ...userInfoError,
              userRequred: "User Is Alreday Exist",
            });
          }
        })
        .catch((error) => console.log(error.message));
    } else {
      setUserInfoError({
        ...userInfoError,
        userRequred: "Please Fill Up The All Requred Field",
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
        userPassword: "Ensure password should be at least 6 charecters",
      });
      setUserInfo({ ...userInfo, userPassword: "" });
    } else {
      setUserInfoError({ ...userInfoError, userPassword: "" });
      setUserInfo({ ...userInfo, userPassword: e.target.value });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#05003B] min-h-screen flex items-center justify-center bg-image">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/2 mx-auto rounded-2xl p-10 bg-transparent border-2">
        <h1 className="text-white text-4xl font-semibold mb-6 text-center">
          Create An Account!
        </h1>

        <div className="relative w-20 h-20 rounded-full drop-shadow-md shadow-md overflow-hidden m-auto my-5">
          <Image
            src={userInfo?.userImage ? userInfo?.userImage : Avatar}
            alt="Avatar Image"
            width={50}
            height={50}
            className="w-full h-full"
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-opacity-50 bg-slate-900 hover:bg-slate-500 duration-300 cursor-pointer w-full text-center">
              <span className="text-sm p-1 text-white">Upload</span>
            </div>
            <input
              type="file"
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleUploadImage}
              required
            />
          </label>
        </div>

        <form onSubmit={handleUserInfo}>
          <input
            type="text"
            className="block w-full p-2.5 text-lg bg-[#304894] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none placeholder:text-base focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Your First Name"
            required
            onChange={(e) =>
              setUserInfo({ ...userInfo, userFirstName: e.target.value })
            }
          />
          <input
            type="text"
            className="block w-full my-5 p-2.5 text-lg bg-[#304894] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none placeholder:text-base focus:ring-1 focus:ring-blue-500"
            placeholder="Enter Your Last Name"
            required
            onChange={(e) =>
              setUserInfo({ ...userInfo, userLastName: e.target.value })
            }
          />
          <input
            type="email"
            className="block w-full my-5 p-2.5 text-lg bg-[#304894] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none placeholder:text-base focus:ring-1 focus:ring-blue-500"
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
              <small className="text-base">{userInfoError.userPassword}</small>
            </div>
          )}

          <input
            type="text"
            className="block my-5 w-full p-2.5 text-lg bg-[#304894] border-2 border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-base"
            placeholder="Enter Reference Name"
            onChange={(e) =>
              setUserInfo({ ...userInfo, referenceName: e.target.value })
            }
          />
          <button
            type="submit"
            className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 transition duration-300 transform hover:scale-95"
          >
            Create Account
          </button>
        </form>
        {userInfoError?.userRequred && (
          <div className="flex justify-center text-violet-500 font-semibold">
            <small className="text-base">{userInfoError.userRequred}</small>
          </div>
        )}
        <hr className="my-5 border-gray-400" />

        <p className="text-sm text-center text-white my-3">
          Already Have An Account?{" "}
          <Link href={"/login"}>
            <span className="text-blue-500">Sign In!</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
