import { AuthInputProps } from "@types";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";

function AuthInput({
  type,
  name,
  value,
  placeholder,
  disabled,
}: AuthInputProps) {
  const { handleUserDetails } = useContext(AuthPageContext);
  return (
    <input
      required
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled ? disabled : false}
      className="w-full text-black text-base lg:text-lg px-4 lg:px-6 py-3 border-border-grey outline-none rounded-full box-border"
      onChange={handleUserDetails}
    />
  );
}

export default AuthInput;
