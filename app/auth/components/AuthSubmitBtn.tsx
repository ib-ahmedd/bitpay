import { AuthSubmitBtnProps } from "@types";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";

function AuthSubmitBtn({ text }: AuthSubmitBtnProps) {
  const { loading } = useContext(AuthPageContext);
  return (
    <>
      {loading ? (
        <button
          disabled
          className="w-full bg-gray-600 text-gray-400 py-3 rounded-full font-bold "
        >
          Processing...
        </button>
      ) : (
        <button className="w-full bg-site-orange py-3 rounded-full font-bold hover:bg-site-orange-hover">
          {text}
        </button>
      )}
    </>
  );
}

export default AuthSubmitBtn;
