"use client";
import AdminUserList from "@/Components/Pages/AdminPages/AdminUserList/AdminUserList";
import AdminRoute from "@/Router/AdminRoute/AdminRoute";

const MyUsers = () => {
  return (
    <AdminRoute>
      <AdminUserList />
    </AdminRoute>
  );
};

export default MyUsers;
