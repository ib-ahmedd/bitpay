import { Order } from "@types";
import { unixToTime } from "@utils";
import { useContext } from "react";
import { OrdersPageContext } from "./OrderPageContext";

function OrderHistoryCard({
  orderId,
  amount,
  status,
  userId,
  price,
  counterPartyName,
  side,
  unreadMessages,
  createDate,
}: Order) {
  const { handleChatOpen } = useContext(OrdersPageContext);
  let statusText;
  let statusTextColor = "text-white";

  switch (status) {
    case 10:
      statusText = "Pending Payment";
      break;
    case 20:
      statusText = "Pending Coin Release";
      break;
    case 30:
      statusText = "Under Appeal";
      break;
    case 40:
      statusText = "Cancelled";
      statusTextColor = "text-site-text-gray";
      break;
    case 50:
      statusText = "Completed";
      statusTextColor = "text-green-300";
      break;
  }
  return (
    <tr className="border border-border-grey h-12">
      <td
        className={`text-center font-bold ${
          side === 1 ? "text-red-500" : "text-green-500"
        }`}
      >
        {side === 0 ? "BUY" : "SELL"}
      </td>
      <td
        className={`font-bold text-center border border-border-grey ${statusTextColor}`}
      >
        {statusText}
      </td>
      <td className="font-bold text-center border border-border-grey">
        N{amount}
      </td>
      <td className="text-center border border-border-grey">
        {counterPartyName}
      </td>
      <td className="text-center border border-border-grey">
        {unixToTime(createDate)}
      </td>
      <td className="text-center border border-border-grey">{price}</td>
      <td className="text-center">{orderId}</td>
      <td className="text-center border border-border-grey">
        <button
          className={`w-4/5 py-2 rounded-lg text-sm border border-border-grey font-bold ${
            Number(unreadMessages) > 0
              ? "bg-site-orange  hover:bg-site-orange-hover"
              : "bg-border-grey"
          }`}
          onClick={() => {
            handleChatOpen(orderId, counterPartyName);
          }}
        >
          {unreadMessages}
        </button>
      </td>
    </tr>
  );
}

export default OrderHistoryCard;
