"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import AuthProvider from "@/Context/AuthProvider";
import MainLayout from "@/Layout/MainLayout";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-image">
          <AuthProvider>
            {pathName === "/login" || pathName === "/signup" ? (
              children
            ) : (
              <MainLayout>{children}</MainLayout>
            )}
            <Toaster></Toaster>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
