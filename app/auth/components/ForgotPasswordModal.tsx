import { AuthModalsProps } from "@types";
import AuthInput from "./AuthInput";
import AuthSubmitBtn from "./AuthSubmitBtn";
import AuthFormContainer from "./AuthFormContainer";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";

function ForgotPasswordModal() {
  const { onScreen, setOnScreen, userDetails, handleUserDetails } =
    useContext(AuthPageContext);
  function handleRequestOTP() {
    setOnScreen("reset-otp");
  }

  function handleModalPosition() {
    const positionOnScreen = "translate-x-0 opacity-100";
    const positionLeftOfScreen = "translate-x-[-100%] opacity-0";
    const positionRightOfScreen = "translate-x-[100%] opacity-0";

    if (onScreen === "forgot-password") {
      return positionOnScreen;
    } else if (onScreen === "reset-otp") {
      return positionRightOfScreen;
    } else if (
      onScreen === "login" ||
      onScreen === "signup" ||
      onScreen === "otp"
    ) {
      return positionLeftOfScreen;
    }
  }

  const { email } = userDetails;

  return (
    <AuthFormContainer
      errorMessage=""
      handleModalPosition={handleModalPosition}
      handleSubmit={handleRequestOTP}
    >
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <AuthInput
        type="email"
        name="email"
        value={email}
        placeholder="Enter email"
      />
      <AuthSubmitBtn text="Reset Password" />
      <div className="w-full flex justify-end px-6 ">
        <button
          className="text-site-orange font-bold underline"
          onClick={() => {
            setOnScreen("login");
          }}
        >
          Sign in
        </button>
      </div>
    </AuthFormContainer>
  );
}

export default ForgotPasswordModal;
