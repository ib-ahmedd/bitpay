import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

function PageArrowBtn({
  arrowIcon,
  func,
  pageNumber,
  setPageNumber,
}: PageArrowBtnProps) {
  return (
    <button
      className="w-14 h-10 bg-site-lighter-grey border border-border-grey"
      onClick={() => {
        if (func === "increase") {
          setPageNumber(pageNumber + 1);
        } else {
          setPageNumber(pageNumber - 1);
        }
      }}
    >
      <FontAwesomeIcon icon={arrowIcon} />
    </button>
  );
}

interface PageArrowBtnProps {
  arrowIcon: IconDefinition;
  func: "increase" | "decrease";
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}
export default PageArrowBtn;
