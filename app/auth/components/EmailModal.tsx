import AuthInput from "./authInput";
import AuthSubmitBtn from "./AuthSubmitBtn";
import { AuthModalsProps } from "@types";

function EmailModal({ onScreen, setOnScreen }: AuthModalsProps) {
  function handleRequestOTP() {
    setOnScreen("otp");
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
      onScreen === "reset-otp"
    ) {
      return positionRightOfScreen;
    } else if (onScreen === "otp") {
      return positionLeftOfScreen;
    }
  }
  return (
    <form
      className={`w-full md:w-[30em] bg-site-lighter-grey border-border-grey rounded-3xl p-4 flex flex-col items-center gap-3 border absolute transition-all ${handleModalPosition()}    
      `}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="text-lg lg:text-2xl font-bold">Register</h2>
      <AuthInput type="email" name="email" value="" placeholder="Enter email" />
      <AuthSubmitBtn text="Sign Up" func={handleRequestOTP} />
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

export default EmailModal;
