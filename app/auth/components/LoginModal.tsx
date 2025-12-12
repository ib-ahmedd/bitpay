import AuthInput from "./AuthInput";
import AuthSubmitBtn from "./AuthSubmitBtn";
import AuthFormContainer from "./AuthFormContainer";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";

function LoginModal() {
  function handleModalPosition() {
    const positionOnScreen = "translate-x-0 opacity-100";
    const positionLeftOfScreen = "translate-x-[-100%] opacity-0";
    const positionRightOfScreen = "translate-x-[100%] opacity-0";

    if (onScreen === "login") {
      return positionOnScreen;
    } else if (
      onScreen === "forgot-password" ||
      onScreen === "reset-password" ||
      onScreen === "reset-otp" ||
      onScreen === "complete"
    ) {
      return positionRightOfScreen;
    } else if (onScreen === "otp" || onScreen === "signup") {
      return positionLeftOfScreen;
    }
  }
  const { onScreen, setOnScreen, handleUserDetails, userDetails } =
    useContext(AuthPageContext);
  const { email, password } = userDetails;
  return (
    <AuthFormContainer
      errorMessage=""
      handleModalPosition={handleModalPosition}
      handleSubmit={() => {}}
    >
      <h2 className="text-lg lg:text-2xl font-bold">Sign In</h2>
      <AuthInput
        type="email"
        name="email"
        value={email}
        placeholder="Enter email"
      />
      <AuthInput
        type="password"
        name="password"
        value={password}
        placeholder="Enter password"
      />

      <AuthSubmitBtn text="Sign In" />
      <div className="flex w-full justify-between px-6">
        <button
          className="text-site-orange font-bold underline"
          onClick={() => {
            setOnScreen("forgot-password");
          }}
        >
          Forgot Password
        </button>
        <button
          className="text-site-orange font-bold underline"
          onClick={() => {
            setOnScreen("signup");
          }}
        >
          Sign up
        </button>
      </div>
    </AuthFormContainer>
  );
}

export default LoginModal;
