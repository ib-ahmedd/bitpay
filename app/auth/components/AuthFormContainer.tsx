import { AuthFormContainerProps } from "@types";
import ErrorMessageBox from "./ErrorMessageBox";

function AuthFormContainer({
  children,
  errorMessage,
  handleModalPosition,
  handleSubmit,
}: AuthFormContainerProps) {
  return (
    <form
      className={`w-full md:w-[30em] bg-site-lighter-grey border-border-grey rounded-3xl flex flex-col items-center gap-2 md:gap-4 border absolute transition-all ${handleModalPosition()}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-col p-4 w-full gap-4 items-center">
        {children}
      </div>
      <div className="relative w-full">
        {errorMessage && <ErrorMessageBox errorMessage={errorMessage} />}
      </div>
    </form>
  );
}

export default AuthFormContainer;
