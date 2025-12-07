"use client";
import { useState } from "react";
import EmailModal from "./components/EmailModal";
import LoginSignUpSwitchBar from "./components/LoginSignUpSwitchBar";
import LoginModal from "./components/LoginModal";
import OTPModal from "./components/OTPModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import ResetPasswordModal from "./components/ResetPasswordModal";

function Auth() {
  const [onScreen, setOnScreen] = useState("login");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confPassword: "",
    api_key: "",
    api_secret: "",
  });
  return (
    <main className="flex h-[100vh] justify-center items-center w-full overflow-x-hidden">
      {/* <LoginSignUpSwitchBar onScreen={onScreen} setOnScreen={setOnScreen} /> */}
      <div className="relative w-full md:w-[30em] h-[30em]">
        <ForgotPasswordModal onScreen={onScreen} setOnScreen={setOnScreen} />
        <LoginModal onScreen={onScreen} setOnScreen={setOnScreen} />
        <EmailModal onScreen={onScreen} setOnScreen={setOnScreen} />
        <OTPModal onScreen={onScreen} setOnScreen={setOnScreen} />
        <ResetPasswordModal onScreen={onScreen} setOnScreen={setOnScreen} />
      </div>
    </main>
  );
}

export default Auth;
