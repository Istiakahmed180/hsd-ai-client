"use client";
import Footer from "@/Components/Common/Footer/Footer";
import Header from "@/Components/Common/Header/Header";
import PrivateRoute from "@/Router/PrivateRoute/PrivateRoute";
import { useState } from "react";
import Sidebar from "@/Components/Common/Sidebar/Sidebar";

const MainLayout = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <PrivateRoute>
      <section className="flex">
        {!show ? (
          <div className="flex-1 hidden md:block">
            <Sidebar></Sidebar>
          </div>
        ) : null}

        <div className="w-full">
          <Header show={show} setShow={setShow}></Header>
          {children}
          <Footer></Footer>
        </div>
      </section>
    </PrivateRoute>
  );
};

export default MainLayout;
