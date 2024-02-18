"use client";
import { AuthContext } from "@/Context/AuthProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaDollarSign } from "react-icons/fa";

const AccountSetting = () => {
  const [userInfo, setUserInfo] = useState({
    userImage: "",
    userPhoneNumberCode: "",
    userGender: "",
  });
  const { user } = useContext(AuthContext);

  const router = useRouter();

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=c8a680c3dc657006d3f689e184b49590",
        formData
      );
      const imageUrl = response.data.data.url;
      setUserInfo({ ...userInfo, userImage: imageUrl });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    const updateProfile = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      image: userInfo?.userImage,
      phone: userInfo.userPhoneNumberCode + e.target.phone.value,
      gender: userInfo.userGender,
      address: e.target.address.value,
      bio: e.target.bio.value,
    };

    axios
      .put(
        `http://ec2-13-229-77-43.ap-southeast-1.compute.amazonaws.com/api/auth/update-profile/${user?._id}`,
        updateProfile
      )
      .then((res) => {
        if (res?.data) {
          toast.success(res.data.message);
          router.push("/login");
          localStorage.removeItem("accessToken");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-[#05003B] container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-light text-gray-300">Dashboard</h1>
        <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          <FaDollarSign className="mr-2" />
          <span>Add Money</span>
        </button>
      </div>
      <div className="bg-blue-900 text-white px-6 py-4 rounded-tl-2xl rounded-tr-2xl">
        <h1 className="text-2xl font-medium">Account Information</h1>
      </div>
      <hr className="my-5 border-[#36325F]" />
      <form onSubmit={handleProfileUpdate}>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-lg font-medium text-white"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            defaultValue={user?.firstName}
            className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={user?.name}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="first_name"
            className="block mb-2 text-lg font-medium text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            defaultValue={user?.lastName}
            className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={user?.name}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="first_name"
            className="block mb-2 text-lg font-medium text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={user?.email}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="phone_number"
            className="block mb-2 text-lg font-medium text-white"
          >
            Phone Number
          </label>
          <div className="flex gap-x-4">
            <select
              required
              className="block w-60 p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  userPhoneNumberCode: e.target.value,
                })
              }
            >
              <option disabled selected>
                Choose Number Code
              </option>
              <option value="+880">Bangladesh (+880)</option>
              <option value="+91">India (+91)</option>
            </select>
            <input
              required
              type="number"
              name="phone"
              defaultValue={user?.phone && user?.phone}
              className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder={
                user?.phone ? user?.phone : "Enter Your Phone Number"
              }
            />
          </div>
        </div>
        <div className="mt-5">
          <label
            htmlFor="gender"
            className="block mb-2 text-lg font-medium text-white"
          >
            Gender
          </label>
          <select
            required
            className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) =>
              setUserInfo({ ...userInfo, userGender: e.target.value })
            }
          >
            <option disabled selected>
              Choose Your Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mt-5">
          <label
            htmlFor="first_name"
            className="block mb-2 text-lg font-medium text-white"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            defaultValue={user?.address && user?.address}
            required
            className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={user?.address ? user?.address : "Enter Your Address"}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="address"
            className="block mb-2 text-lg font-medium text-white"
          >
            Bio
          </label>
          <textarea
            defaultValue={user?.bio && user?.bio}
            required
            name="bio"
            rows="4"
            className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={user?.bio ? user?.bio : "Write About Yourself"}
          ></textarea>
        </div>
        <div className="mt-5">
          <label
            htmlFor="address"
            className="block mb-2 text-lg font-medium text-white"
          >
            Upload Image
          </label>
          <input
            required
            className="block w-full p-2.5 text-lg bg-[#140F47] border border-[#36325F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="multiple_files"
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
          />
        </div>
        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className="text-white w-64 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
         transition duration-500 ease-in-out transform  hover:scale-105"
          >
            Profile Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSetting;
