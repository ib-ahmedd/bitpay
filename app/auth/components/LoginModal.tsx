import AuthInput from "./AuthInput";
import AuthSubmitBtn from "./AuthSubmitBtn";
import AuthFormContainer from "./AuthFormContainer";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import { useRouter } from "next/navigation";
import { handleSiteLogin } from "@store/globalSlice";

function LoginModal() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
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
  const { apiLink } = useSelector((state: RootState) => state.global);
  const { onScreen, setOnScreen, userDetails } = useContext(AuthPageContext);
  const { email, password } = userDetails;

  async function handleLogin() {
    try {
      const response = await axios.post(apiLink + "/auth/login", {
        email: email,
        password: password,
      });
      const { data } = response;

      dispatch(handleSiteLogin(data));
      localStorage.setItem("userDetails", JSON.stringify(data));
      router.push("/market");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AuthFormContainer
      errorMessage=""
      handleModalPosition={handleModalPosition}
      handleSubmit={handleLogin}
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
        <p
          className="text-site-orange font-bold underline cursor-pointer"
          onClick={() => {
            setOnScreen("forgot-password");
          }}
        >
          Forgot Password
        </p>
        <p
          className="text-site-orange font-bold underline cursor-pointer"
          onClick={() => {
            setOnScreen("signup");
          }}
        >
          Sign up
        </p>
      </div>
    </AuthFormContainer>
  );
}

export default LoginModal;
