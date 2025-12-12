import { AuthInputProps } from "@types";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";

function AuthLabeledInput({ type, name, value, placeholder }: AuthInputProps) {
  const { handleUserDetails } = useContext(AuthPageContext);
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className="w-full text-black text-base lg:text-lg px-6 py-1 lg:py-3 border-border-grey outline-none rounded-full box-border"
        onChange={handleUserDetails}
      />
    </div>
  );
}

export default AuthLabeledInput;
