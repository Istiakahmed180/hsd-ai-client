"use client";
import axios from "axios";
import moment from "moment/moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminProfit = () => {
  const [adminProfit, setAdminProfit] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAdminProfit = await axios.get(
          "http://13.229.77.43/api/profit/get-admin-profit"
        );
        const data = await getAdminProfit.data;
        setAdminProfit(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <div className="bg-blue-900 text-white px-6 py-4 rounded-tl-2xl rounded-tr-2xl">
        <h1 className="text-2xl font-medium">Admin Profit</h1>
      </div>
      <div className="mt-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left ">
            <thead className="  uppercase ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 
                text-white "
                >
                  S/N
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 
                text-white"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 
                text-white"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 
                text-white"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 
                text-white"
                >
                  Profit
                </th>
              </tr>
            </thead>
            {adminProfit?.length ? (
              adminProfit?.map((item, index) => {
                const formatedDate = moment(item?.date).format("DD-MM-YYYY");

                return (
                  <tbody key={item?._id}>
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium  whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-3">{item?.name}</td>
                      <td className="px-6 py-3">${item?.email}</td>
                      <td className="px-6 py-3">{formatedDate}</td>
                      <td className="px-6 py-3 text-orange-500 font-bold">
                        $ {item?.vat}
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <div>
                <p className="text-center font-semibold text-red-500 mt-20 text-2xl">
                  Admin Profit Data Is Not Available
                </p>
              </div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfit;
