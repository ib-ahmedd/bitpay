import { useContext } from "react";
import AuthFormContainer from "./AuthFormContainer";
import AuthInput from "./AuthInput";
import AuthSubmitBtn from "./AuthSubmitBtn";
import { AuthModalsProps } from "@types";
import axios from "axios";
import { AuthPageContext } from "./AuthPageContext";

function EmailModal() {
  const {
    onScreen,
    setOnScreen,
    userDetails,
    errorMessage,
    setErrorMessage,
    setLoading,
  } = useContext(AuthPageContext);

  const { email } = userDetails;

  async function handleSubmit() {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/request-otp", {
        email: email,
        method: "register",
      });
      setOnScreen("otp");
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.response.data);
    }

    setLoading(false);
  }

  function handleModalPosition() {
    const positionOnScreen = "translate-x-0 opacity-100";
    const positionLeftOfScreen = "translate-x-[-100%] opacity-0";
    const positionRightOfScreen = "translate-x-[100%] opacity-0";

    if (onScreen === "signup") {
      return positionOnScreen;
    } else if (
      onScreen === "login" ||
      onScreen === "forgot-password" ||
      onScreen === "reset-otp" ||
      onScreen === "complete"
    ) {
      return positionRightOfScreen;
    } else if (onScreen === "otp") {
      return positionLeftOfScreen;
    }
  }
  return (
    <AuthFormContainer
      errorMessage={errorMessage}
      handleModalPosition={handleModalPosition}
      handleSubmit={handleSubmit}
    >
      <h2 className="text-lg lg:text-2xl font-bold">Register</h2>
      <AuthInput
        type="email"
        name="email"
        value={email}
        placeholder="Enter email"
      />
      <AuthSubmitBtn text="Sign Up" />
      <div className="w-full flex px-6 ">
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

export default EmailModal;
