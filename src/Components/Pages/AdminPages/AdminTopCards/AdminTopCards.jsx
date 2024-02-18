"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";

const AdminTopCards = () => {
  const [adminProfit, setAdminProfit] = useState([]);

  const groupByMonth = (data) => {
    return data.reduce((groups, item) => {
      const date = new Date(item?.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const key = `${year}-${month}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item?.vat);

      return groups;
    }, {});
  };

  const calculateSumByMonth = (data) => {
    const groupedData = groupByMonth(data);

    return Object.keys(groupedData).map((key) => ({
      month: key,
      sum: groupedData[key].reduce((acc, value) => acc + value, 0),
    }));
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAdminProfit = await axios.get(
          "http://13.229.77.43/api/profit/get-admin-profit"
        );
        const data = await getAdminProfit.data.data;

        const currentMonthData = data.filter((item) => {
          const date = new Date(item.date);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return month === currentMonth && year === currentYear;
        });

        setAdminProfit(currentMonthData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentMonth, currentYear]);

  const vatSumByMonth = calculateSumByMonth(adminProfit);

  return (
    <div className="grid lg:grid-cols-4 gap-4 pt-4 mb-10">
      <div
        className="lg:col-span-2 col-span-1 bg-white flex justify-between items-center w-full border p-4 rounded-lg 
      "
      >
        <div className=" w-full">
          <p className="font-bold text-2xl text-center">Monthly Profit</p>
          {!vatSumByMonth.length ? (
            <p className="text-3xl font-bold justify-center flex items-center text-blue-500">
              <FaDollarSign className="" /> 0
            </p>
          ) : (
            <p className="text-3xl font-bold justify-center flex items-center text-blue-500">
              <FaDollarSign className="" />{" "}
              {parseFloat(vatSumByMonth[0]?.sum).toFixed(2)}
            </p>
          )}
        </div>
      </div>
      <div
        className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg
       "
      >
        <div className="flex flex-col w-full pb-4 mt-5">
          <p className="font-bold text-2xl text-center">Current Transaction</p>
          <p className="text-3xl font-bold flex justify-center items-center text-blue-500">
            <FaDollarSign className="" />0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminTopCards;
