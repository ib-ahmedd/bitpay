import React, { Children } from "react";
import "./globals.css";
import "dotenv/config";
import Hero from "./components/hero/Hero";
import ReduxProvider from "@store/ReduxProvider";
import Navbar from "./components/navbar/Navbar";
import { LayoutProps } from "@types";
import PageTitleBar from "@components/PageTitleBar";

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className="relative w-full transition duration-100 bg-site-dark-grey text-white px-4 xl:px-20 box-border ">
        <ReduxProvider>
          {/* <Navbar /> */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
