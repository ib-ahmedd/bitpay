import { AuthModalsProps } from "@types";
import AuthSubmitBtn from "./AuthSubmitBtn";
import axios from "axios";
import { useContext, useState } from "react";
import AuthFormContainer from "./AuthFormContainer";
import { AuthPageContext } from "./AuthPageContext";

function OTPModal() {
  const { onScreen, setOnScreen, userDetails, setAuthToken } =
    useContext(AuthPageContext);
  const [code, setCode] = useState("");
  const { email } = userDetails;
  function handleModalPosition() {
    const positionOnScreen = "translate-x-0 opacity-100";
    const positionLeftOfScreen = "translate-x-[-100%] opacity-0";
    const positionRightOfScreen = "translate-x-[100%] opacity-0";

    if (onScreen === "otp" || onScreen === "reset-otp") {
      return positionOnScreen;
    } else if (onScreen === "forgot-password") {
      return positionLeftOfScreen;
    } else {
      return positionRightOfScreen;
    }
  }

  async function handleSubmitOTP() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: email,
          code: code,
        }
      );

      const { data } = response;
      if (setAuthToken) {
        setAuthToken(data);
      }
      if (onScreen === "reset-otp") {
        setOnScreen("reset-password");
      } else if (onScreen === "otp") {
        setOnScreen("complete");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AuthFormContainer
      errorMessage=""
      handleModalPosition={handleModalPosition}
      handleSubmit={handleSubmitOTP}
    >
      <h2 className="text-lg lg:text-2xl font-bold">Verify Email</h2>
      <p className="text-center">
        An OTP code has been sent to your email. Enter code to verify email.
      </p>
      <input
        className="w-1/2 text-black px-6 py-2 border-border-grey outline-none rounded-full box-border text-center text-2xl"
        type="text"
        name="code"
        required
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <AuthSubmitBtn text="Verify" />
      <div className="flex justify-between w-full px-6">
        <button
          className="text-site-orange font-bold underline"
          onClick={() => {
            setOnScreen(onScreen === "otp" ? "signup" : "forgot-password");
          }}
        >
          Wrong Email?
        </button>
        <button className="text-site-orange font-bold underline">
          Resend OTP
        </button>
      </div>
    </AuthFormContainer>
  );
}

export default OTPModal;
