import { AuthModalsProps } from "@types";
import AuthInput from "./authInput";
import AuthSubmitBtn from "./AuthSubmitBtn";

function ForgotPasswordModal({ onScreen, setOnScreen }: AuthModalsProps) {
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

  return (
    <form
      className={`w-full md:w-[30em] bg-site-lighter-grey border-border-grey rounded-3xl p-4 flex flex-col items-center gap-3 border absolute transition-all ${handleModalPosition()}`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <AuthInput type="email" name="email" value="" placeholder="Enter email" />
      <AuthSubmitBtn text="Reset Password" func={handleRequestOTP} />
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
    </form>
  );
}

export default ForgotPasswordModal;
