import React from "react";
import "./globals.css";
import "dotenv/config";
import Hero from "./components/hero/hero";
import ReduxProvider from "@store/ReduxProvider";
import Navbar from "./components/navbar/Navbar";

const RootLayout = () => {
  return (
    <html lang="en">
      <body className="relative w-full transition duration-100 bg-body-dark text-white px-4 xl:px-20 box-border ">
        <ReduxProvider>
          <Navbar />
          <Hero />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
