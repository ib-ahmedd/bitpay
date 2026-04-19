import SideBtn from "./SideBtn";
import { useContext } from "react";
import { PendingPageContext } from "./PendingPageContext";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import {
  sampleBuyPendingOrdersArray,
  sampleSellPendingOrdersArray,
} from "@app/constants";

function BuySellBtns() {
  const { pageDetails, activeSide } = useContext(PendingPageContext);

  return (
    <div className="md:w-1/3 flex gap-1 md:gap-2 text-sm md:text-base">
      <SideBtn
        side={"0"}
        activeSide={activeSide}
        btnText="BUY"
        count={pageDetails.orders.buyOrders.length}
      />
      <SideBtn
        side={"1"}
        activeSide={activeSide}
        btnText="SELL"
        count={pageDetails.orders.sellOrders.length}
      />
    </div>
  );
}

export default BuySellBtns;
