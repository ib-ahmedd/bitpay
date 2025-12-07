import { LoginSignUpSwitchBarProps } from "@types";

function LoginSignUpSwitchBar({
  onScreen,
  setOnScreen,
}: LoginSignUpSwitchBarProps) {
  return (
    <div
      className={`w-[30em] flex justify-between gap-2 transition-all ${
        onScreen === "otp" && "translate-x-[-100%] opacity-0"
      } ${
        onScreen === "login" ||
        (onScreen === "signup" && "translate-x-0] opacity-100")
      }`}
    >
      <button
        className={`w-1/2 border border-border-grey p-3 rounded-full hover:bg-site-lighter-grey ${
          onScreen === "login" && "bg-site-lighter-grey font-bold"
        }`}
        onClick={() => {
          setOnScreen("login");
        }}
      >
        Login
      </button>
      <button
        className={`w-1/2 border border-border-grey p-3 rounded-full hover:bg-site-lighter-grey ${
          onScreen === "signup" && "bg-site-lighter-grey font-bold"
        }`}
        onClick={() => {
          setOnScreen("signup");
        }}
      >
        Sign Up
      </button>
    </div>
  );
}

export default LoginSignUpSwitchBar;
