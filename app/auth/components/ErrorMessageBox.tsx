import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthPageContext } from "./AuthPageContext";

function ErrorMessageBox() {
  const { errorMessage } = useContext(AuthPageContext);
  return (
    <div
      className={`${
        errorMessage === "" && "hidden"
      } absolute w-full -bottom-16 flex justify-center items-center gap-2 bg-site-transparent-red py-3 px-4 box-border border border-red-950 rounded-full text-center text-red-600`}
    >
      <FontAwesomeIcon icon={faWarning as IconDefinition} />
      <p className="font-bold">{errorMessage}</p>
    </div>
  );
}

export default ErrorMessageBox;
