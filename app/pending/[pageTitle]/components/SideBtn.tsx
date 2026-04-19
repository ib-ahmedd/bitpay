import { AppDispatch } from "@store";
import { handlePendingOrdersSide } from "@store/globalSlice";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PendingPageContext } from "./PendingPageContext";

function SideBtn({ btnText, side, count }: SideBtnProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { pageDetails, activeSide, setActiveSide } =
    useContext(PendingPageContext);

  let defaultBtnStyle =
    "border-2 w-[4em] md:w-[6em] py-1 md:py-2 font-bold rounded-full ";

  const [btnStyle, setBtnStyle] = useState(
    "border-2 w-[4em] md:w-[6em] py-1 md:py-2 font-bold rounded-full "
  );

  useEffect(() => {
    if (count > 0 && side === "0") {
      setBtnStyle(
        () =>
          defaultBtnStyle +
          `border-green-500 text-green-500 hover:bg-green-500 hover:text-white ${
            activeSide === "0" && "bg-green-500 text-white"
          }`
      );
    } else if (count > 0 && side === "1") {
      setBtnStyle(
        () =>
          defaultBtnStyle +
          `border-red-500 text-red-500 hover:bg-red-500 hover:text-white ${
            activeSide === "1" && "bg-red-500 text-white"
          }`
      );
    } else if (count === 0) {
      setBtnStyle(
        () =>
          defaultBtnStyle +
          `border-border-grey text-site-text-gray ${
            activeSide === side && "bg-border-grey"
          }`
      );
    }
  }, [activeSide, side, btnStyle, count]);
  return (
    <button
      disabled={count < 1}
      className={btnStyle}
      onClick={() => {
        setActiveSide(side);
        dispatch(handlePendingOrdersSide({ side, status: pageDetails.status }));
      }}
    >
      {btnText}({count})
    </button>
  );
}

interface SideBtnProps {
  activeSide: "0" | "1";
  btnText: string;
  side: "0" | "1";
  count: number;
}
export default SideBtn;
