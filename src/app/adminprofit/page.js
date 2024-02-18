"use client";
import AdminProfit from "@/Components/Pages/AdminPages/AdminProfit/AdminProfit";
import AdminRoute from "@/Router/AdminRoute/AdminRoute";

const page = () => {
  return (
    <AdminRoute>
      <AdminProfit />
    </AdminRoute>
  );
};

export default page;
