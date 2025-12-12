import { AuthModalsProps } from "@types";
import AuthInput from "./AuthInput";
import AuthSubmitBtn from "./AuthSubmitBtn";
import AuthLabeledInput from "./AuthLabeledInput";
import axios from "axios";
import AuthFormContainer from "./AuthFormContainer";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";

function CompleteSignUpModal() {
  function handleModalPosition() {
    const positionOnScreen = "translate-x-0 opacity-100";
    const positionRightOfScreen = "translate-x-[100%] opacity-0";

    if (onScreen === "complete") {
      return positionOnScreen;
    } else {
      return positionRightOfScreen;
    }
  }

  const { onScreen, userDetails, authToken } = useContext(AuthPageContext);
  const { api_key, api_secret, email, password, confPassword } = userDetails;

  async function handleSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email: email,
          password: password,
          api_key,
          api_secret,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AuthFormContainer
      errorMessage=""
      handleModalPosition={handleModalPosition}
      handleSubmit={handleSubmit}
    >
      <h2 className="text-lg lg:text-2xl font-bold">Complete Registration</h2>
      <AuthInput type="text" name="api_key" value={email} disabled={true} />
      <div className="flex gap-2">
        <AuthLabeledInput
          type="password"
          label="Enter Password"
          name="password"
          value={password}
          placeholder="Enter password"
        />
        <AuthLabeledInput
          type="password"
          label="Confirm Password"
          name="confPassword"
          value={confPassword}
          placeholder="Confirm password"
        />
      </div>
      <AuthInput
        type="text"
        name="api_secret"
        value={api_secret}
        placeholder="Enter API secret"
      />
      <AuthInput
        type="text"
        name="api_key"
        value={api_key}
        placeholder="Enter API key"
      />
      <AuthSubmitBtn text="Complete Registration" />
    </AuthFormContainer>
  );
}

export default CompleteSignUpModal;
