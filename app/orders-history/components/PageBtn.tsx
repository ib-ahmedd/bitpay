import { Dispatch, SetStateAction } from "react";

function PageBtn({
  btnNumber,
  pageNumber,
  setPageNumber,
}: {
  btnNumber: number;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}) {
  return (
    <button
      className={`w-10 h-10 border border-border-grey ${
        btnNumber === pageNumber
          ? "bg-site-orange"
          : "bg-site-lighter-grey hover:bg-border-grey"
      }`}
      onClick={() => {
        setPageNumber(btnNumber);
      }}
    >
      {btnNumber}
    </button>
  );
}

export default PageBtn;
