import { AuthModalsProps } from "@types";
import AuthInput from "./AuthInput";
import AuthSubmitBtn from "./AuthSubmitBtn";
import AuthFormContainer from "./AuthFormContainer";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";

function ForgotPasswordModal() {
  const { onScreen, setOnScreen, userDetails, setLoading } =
    useContext(AuthPageContext);
  function handleRequestOTP() {
    setLoading(true);
    setOnScreen("reset-otp");
    setLoading(false);
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
      <h2 className="text-2xl font-bold cursor-pointer">Forgot Password</h2>
      <AuthInput
        type="email"
        name="email"
        value={email}
        placeholder="Enter email"
      />
      <AuthSubmitBtn text="Reset Password" />
      <div className="w-full flex justify-end px-6 ">
        <p
          className="text-site-orange font-bold underline cursor-pointer"
          onClick={() => {
            setOnScreen("login");
          }}
        >
          Sign in
        </p>
      </div>
    </AuthFormContainer>
  );
}

export default ForgotPasswordModal;
