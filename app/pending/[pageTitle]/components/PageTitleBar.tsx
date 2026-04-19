import { AppDispatch, RootState } from "@store";
import { handleGetOrders } from "@store/globalSlice";
import { PageDetails } from "@types";
import { useDispatch, useSelector } from "react-redux";
import BuySellBtns from "./BuySellBtns";
import { useContext } from "react";
import { PendingPageContext } from "./PendingPageContext";

function PageTitleBar() {
  const { balanceDetails, orders } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch<AppDispatch>();

  const { pageDetails } = useContext(PendingPageContext);

  return (
    <div
      className="flex items-center justify-between mb-2
   xl:mb-4 font-bold px-2 md:px-4 lg:px-8"
    >
      <BuySellBtns />
      <div className="hidden w-1/3 md:flex gap-2 py-2 px-8 justify-center bg-site-lighter-grey border border-border-grey rounded-full font-bold">
        <p>${balanceDetails.walletBalance}</p>
        <p>|</p>
        <p>N{balanceDetails.bankBalance}</p>
      </div>
      <div className="md:w-1/3 flex justify-end">
        <div className="flex gap-2 text-sm xl:text-base">
          <p className="bg-site-lighter-grey p-2 rounded-full border border-border-grey">
            Orders: {pageDetails.count}
          </p>
          {!orders.ordersLoading ? (
            <button
              className="bg-site-orange py-2 px-3 rounded-full border border-border-grey"
              onClick={() => {
                dispatch(handleGetOrders());
              }}
            >
              Reload
            </button>
          ) : (
            <button
              className="bg-border-grey py-2 px-3 rounded-full border border-border-grey"
              disabled
            >
              Loading...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageTitleBar;
