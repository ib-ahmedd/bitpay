import { AuthModalsProps } from "@types";
import AuthInput from "./AuthInput";
import AuthSubmitBtn from "./AuthSubmitBtn";
import AuthFormContainer from "./AuthFormContainer";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";

function ResetPasswordModal() {
  const { onScreen, setOnScreen, handleUserDetails } =
    useContext(AuthPageContext);
  function handleModalPosition() {
    const positionOnScreen = "translate-x-0 opacity-100";
    const positionLeftOfScreen = "translate-x-[-100%] opacity-0";

    if (onScreen === "reset-password") {
      return positionOnScreen;
    } else {
      return positionLeftOfScreen;
    }
  }

  function handleResetPassword() {
    setOnScreen("login");
  }
  return (
    <AuthFormContainer
      errorMessage=""
      handleModalPosition={handleModalPosition}
      handleSubmit={handleResetPassword}
    >
      <h2 className="text-lg lg:text-2xl font-bold">Reset Password</h2>

      <AuthInput
        type="password"
        name="password"
        value=""
        placeholder="Enter password"
      />
      <AuthInput
        type="password"
        name="Conf-password"
        value=""
        placeholder="Confirm password"
      />

      <AuthSubmitBtn text="Reset Password" />
    </AuthFormContainer>
  );
}

export default ResetPasswordModal;
