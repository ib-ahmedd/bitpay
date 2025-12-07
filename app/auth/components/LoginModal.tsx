import { AuthModalsProps } from "@types";
import AuthInput from "./authInput";
import AuthSubmitBtn from "./AuthSubmitBtn";

function LoginModal({ onScreen, setOnScreen }: AuthModalsProps) {
  function handleModalPosition() {
    const positionOnScreen = "translate-x-0 opacity-100";
    const positionLeftOfScreen = "translate-x-[-100%] opacity-0";
    const positionRightOfScreen = "translate-x-[100%] opacity-0";

    if (onScreen === "login") {
      return positionOnScreen;
    } else if (
      onScreen === "forgot-password" ||
      onScreen === "reset-password" ||
      onScreen === "reset-otp"
    ) {
      return positionRightOfScreen;
    } else if (onScreen === "otp" || onScreen === "signup") {
      return positionLeftOfScreen;
    }
  }
  return (
    <form
      className={`w-full md:w-[30em] bg-site-lighter-grey border-border-grey rounded-3xl p-2 lg:p-4 flex flex-col items-center gap-3 border absolute  transition-all ${handleModalPosition()}`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="text-lg lg:text-2xl font-bold">Sign In</h2>
      <AuthInput type="email" name="email" value="" placeholder="Enter email" />
      <AuthInput
        type="password"
        name="password"
        value=""
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
    </form>
  );
}

export default LoginModal;
