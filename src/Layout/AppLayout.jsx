"use client";
import AdminDashboard from "@/Components/Pages/AdminPages/AdminDashboard/AdminDashboard";
import UserDashboard from "@/Components/Pages/UserPages/UserDashboard/UserDashboard";
import { AuthContext } from "@/Context/AuthProvider";
import AdminRoute from "@/Router/AdminRoute/AdminRoute";
import React, { useContext } from "react";

const AppLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user?.role === "admin" ? (
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      ) : (
        <UserDashboard></UserDashboard>
      )}
    </div>
  );
};

export default AppLayout;
