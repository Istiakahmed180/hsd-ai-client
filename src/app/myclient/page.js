"use client";
import AdminClientList from "@/Components/Pages/AdminPages/AdminClientList/AdminClientList";
import AdminRoute from "@/Router/AdminRoute/AdminRoute";

const MyClient = () => {
  return (
    <AdminRoute>
      <AdminClientList />
    </AdminRoute>
  );
};

export default MyClient;
