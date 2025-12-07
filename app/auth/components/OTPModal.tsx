import { AuthModalsProps } from "@types";
import AuthSubmitBtn from "./AuthSubmitBtn";

function OTPModal({ onScreen, setOnScreen }: AuthModalsProps) {
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

  function handleSubmitOTP() {
    if (onScreen === "reset-otp") {
      setOnScreen("reset-password");
    }
  }
  return (
    <form
      className={`w-full md:w-[30em] bg-site-lighter-grey border-border-grey rounded-3xl p-4 flex flex-col items-center gap-1 border absolute transition-all ${handleModalPosition()}`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="text-lg lg:text-2xl font-bold">Verify Email</h2>
      <p className="text-center">
        An OTP code has been sent to your email. Enter code to verify email.
      </p>
      <input
        className="w-1/2 text-black px-6 py-2 border-border-grey outline-none rounded-full box-border text-center text-2xl"
        type="text"
        name="otp"
      />
      <AuthSubmitBtn text="Verify" func={handleSubmitOTP} />
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
    </form>
  );
}

export default OTPModal;
