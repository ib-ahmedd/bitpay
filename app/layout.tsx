import React, { Children } from "react";
import "./globals.css";
import "dotenv/config";
import ReduxProvider from "@store/ReduxProvider";
import Navbar from "./components/navbar/Navbar";
import { LayoutProps } from "@types";
import AppWrapper from "./components/app-wrapper/AppWrapper";

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className="relative w-full transition duration-100 bg-site-dark-grey text-white px-2 md:px-4 xl:px-20 box-border ">
        <ReduxProvider>
          <AppWrapper>
            <Navbar />
            {children}
          </AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
