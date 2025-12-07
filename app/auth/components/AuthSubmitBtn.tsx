import { AuthSubmitBtnProps } from "@types";

function AuthSubmitBtn({ text, func }: AuthSubmitBtnProps) {
  return (
    <button
      className="w-full bg-site-orange py-3 rounded-full my-2 font-bold hover:bg-site-orange-hover"
      onClick={() => {
        if (func) {
          func();
        }
      }}
    >
      {text}
    </button>
  );
}

export default AuthSubmitBtn;
