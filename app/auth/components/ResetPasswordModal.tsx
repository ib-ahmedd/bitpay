import { AuthModalsProps } from "@types";
import AuthInput from "./authInput";
import AuthSubmitBtn from "./AuthSubmitBtn";

function ResetPasswordModal({ onScreen, setOnScreen }: AuthModalsProps) {
  function handleModalPosition() {
    const positionOnScreen = "translate-x-0 opacity-100";
    const positionLeftOfScreen = "translate-x-[-100%] opacity-0";
    const positionRightOfScreen = "translate-x-[100%] opacity-0";

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
    <form
      className={`w-full md:w-[30em] bg-site-lighter-grey border-border-grey rounded-3xl p-4 flex flex-col items-center gap-3 border absolute  transition-all ${handleModalPosition()}`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
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

      <AuthSubmitBtn text="Reset Password" func={handleResetPassword} />
    </form>
  );
}

export default ResetPasswordModal;
