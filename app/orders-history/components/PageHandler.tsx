import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import PageArrowBtn from "./PageArrowBtn";
import PageBtn from "./PageBtn";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Dispatch, SetStateAction, useState } from "react";

function PageHandler({ pageNumber, count, setPageNumber }: PageHandlerProps) {
  const maxPageNumber = Math.floor(count / 30);

  const [pageInput, setPageInput] = useState(pageNumber);

  function handleSetPage() {
    setPageNumber(pageInput);
  }
  return (
    <article className="w-full mt-2 flex flex-col items-center justify-center">
      <p>
        Page {pageNumber} of {maxPageNumber}
      </p>
      <div className="flex gap-1 h-full">
        <form
          className=" h-full justify-between flex flex-col gap-1"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex gap-1">
            <PageArrowBtn
              arrowIcon={faCaretLeft as IconDefinition}
              func="decrease"
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
            <input
              className="no-spinners h-10 w-20 bg-site-lighter-grey border border-border-grey outline-none text-center"
              type="text"
              value={pageInput}
              onChange={(e) => {
                const { value } = e.target;
                setPageInput(() => {
                  if (Number(value).toString() !== NaN.toString()) {
                    return Number(value);
                  } else {
                    return 0;
                  }
                });
              }}
              onBlur={() => {
                if (pageInput < 1) {
                  setPageInput(1);
                }
                if (pageInput > maxPageNumber) {
                  setPageInput(maxPageNumber);
                }
              }}
            />
            <PageArrowBtn
              arrowIcon={faCaretRight as IconDefinition}
              func="increase"
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </div>
          {pageInput > 0 && pageInput <= maxPageNumber ? (
            <button
              className="h-10 bg-site-orange cursor-pointer"
              onClick={handleSetPage}
            >
              Set
            </button>
          ) : (
            <button disabled className="h-10 bg-site-text-gray ">
              Set
            </button>
          )}
        </form>
      </div>
    </article>
  );
}

interface PageHandlerProps {
  pageNumber: number;
  count: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

export default PageHandler;
