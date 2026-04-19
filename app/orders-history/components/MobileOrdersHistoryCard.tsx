"use client";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order } from "@types";
import { unixToTime } from "@utils";
import { useContext } from "react";
import { OrdersPageContext } from "./OrderPageContext";

function MobileOrdersHistoryCard({
  orderId,
  amount,
  userId,
  price,
  counterPartyName,
  side,
  unreadMessages,
  createDate,
  expandedOrder,
  setExpandedOrder,
}: Order) {
  const { handleChatOpen } = useContext(OrdersPageContext);
  return (
    <article className="p-2 border bg-site-lighter-grey border-border-grey rounded-lg flex flex-col hover:cursor-pointer">
      <div
        className="flex justify-between items-center"
        onClick={() => {
          if (expandedOrder === orderId) {
            setExpandedOrder && setExpandedOrder("0");
          } else {
            setExpandedOrder && setExpandedOrder(orderId);
          }
        }}
      >
        <div className="flex flex-col justify-between flex-1">
          <div className="flex justify-between items-center ">
            <h2
              className={`text-center font-bold ${
                side === 1 ? "text-red-500" : "text-green-500"
              }`}
            >
              {side === 0 ? "BUY" : "SELL"}
            </h2>
            <p>{unixToTime(createDate)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold w-[30%]">{amount}</p>
            <p className="w-[50%] text-sm text-end font-bold flex-1">
              {counterPartyName}
            </p>
          </div>
        </div>
        <div className="px-3">
          <p>
            <FontAwesomeIcon
              icon={
                expandedOrder === orderId
                  ? (faCaretUp as IconDefinition)
                  : (faCaretDown as IconDefinition)
              }
            />
          </p>
        </div>
      </div>
      <div
        className={`border-t border-border-grey mt-1 pt-1 flex-col ${
          expandedOrder === orderId ? "flex" : "hidden"
        }`}
      >
        <p>Order ID: {orderId}</p>
        <p>Price: {price}</p>
        <p>Unread Messages: {unreadMessages}</p>
        <button
          className="p-1 bg-site-orange rounded-lg"
          onClick={() => {
            handleChatOpen(orderId, counterPartyName);
          }}
        >
          Open Chat
        </button>
      </div>
    </article>
  );
}
export default MobileOrdersHistoryCard;
