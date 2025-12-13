"use client";
import { useState } from "react";
import EmailModal from "./components/EmailModal";
import LoginModal from "./components/LoginModal";
import OTPModal from "./components/OTPModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import ResetPasswordModal from "./components/ResetPasswordModal";
import CompleteSignUpModal from "./components/CompleteSignUpModal";
import { AuthModalOptions, AuthUserDetails } from "@types";
import { AuthPageContext } from "./components/AuthPageContext";

function Auth() {
  const [onScreen, setOnScreen] = useState<AuthModalOptions>("login");
  const [userDetails, setUserDetails] = useState<AuthUserDetails>({
    email: "",
    password: "",
    confPassword: "",
    api_key: "",
    api_secret: "",
  });

  const [authAccessToken, setAuthAccessToken] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleUserDetails(event: any) {
    const { name, value } = event.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const contextValue = {
    onScreen,
    setOnScreen,
    userDetails,
    setUserDetails,
    authAccessToken,
    setAuthAccessToken,
    loading,
    setLoading,
    errorMessage,
    setErrorMessage,
    handleUserDetails,
  };
  return (
    <AuthPageContext.Provider value={contextValue}>
      <main className="flex flex-col h-[100vh] justify-center items-center w-full overflow-x-hidden box-border">
        <div className="relative w-full md:w-[30em] h-[100vh] box-border flex items-center">
          <ForgotPasswordModal />
          <LoginModal />
          <EmailModal />
          <OTPModal />
          <ResetPasswordModal />
          <CompleteSignUpModal />
        </div>
      </main>
    </AuthPageContext.Provider>
  );
}

export default Auth;
