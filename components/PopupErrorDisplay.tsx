import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDispatch, RootState } from "@store";
import { handleResetError } from "@store/globalSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PopupErrorDisplay() {
  const { popUpError, popUpErrorMessage } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (popUpError) {
      setTimeout(() => {
        dispatch(handleResetError({ type: "POPUP" }));
      }, 5000);
    }
  }, [popUpError]);
  return (
    <section
      className={`w-full z-50 px-2 fixed bottom-0 left-0 flex justify-center py-8 transition-all duration-1000 ${
        popUpError ? "translate-y-[0]" : "translate-y-[100%]"
      }`}
    >
      <article className="w-full md:w-[50em] flex items-center justify-center gap-2 bg-popup-red border-2 border-red-500 rounded-full py-4 text-center">
        <span className="text-xl md:text-2xl text-red-500">
          <FontAwesomeIcon icon={faWarning as IconDefinition} />
        </span>
        <p className="text-lg md:text-xl">{popUpErrorMessage}</p>
      </article>
    </section>
  );
}

export default PopupErrorDisplay;
