import { AuthInputProps } from "@types";

function AuthInput({ type, name, value, placeholder }: AuthInputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      className="w-full text-black text-base lg:text-lg px-6 py-1 lg:py-3 border-border-grey outline-none rounded-full box-border"
    />
  );
}

export default AuthInput;
