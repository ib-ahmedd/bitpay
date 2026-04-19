import { Order } from "@types";
import { useCallback, useContext, useEffect, useState } from "react";
import { PendingPageContext } from "./PendingPageContext";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@store";

function MobilePendingPaymentOrderCard({
  counterPartyName,
  amount,
  orderId,
  unreadMessages,
  handleOpenChat,
  side,
  status,
  targetUserId,
}: Order) {
  const [counterPartyDetails, setCounterPartyDetails] = useState({
    averageReleaseTime: "",
    goodAppraiseCount: 0,
    badAppraiseCount: 0,
    accountNo: "",
    bankName: "",
    paymentId: "",
    paymentType: "",
  });

  const { apiLink, accessToken, userDetails } = useSelector(
    (state: RootState) => state.global
  );

  const { handleRelease, handleMarkPaid, handleSendPaid } =
    useContext(PendingPageContext);

  const [releasing, setReleasing] = useState(false);

  const getCounterPartyDetails = useCallback(async () => {
    const { credentials } = userDetails;
    try {
      const response = await axios.post(
        apiLink + "/counterparty-details",
        {
          credentialsToken: credentials,
          orderId: orderId,
          targetUserId: targetUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data } = response;
      setCounterPartyDetails((prev) => {
        return { ...prev, ...data };
      });
    } catch (err) {
      console.log(err);
    }
  }, [userDetails, apiLink, accessToken]);

  useEffect(() => {
    getCounterPartyDetails();
  }, [getCounterPartyDetails]);
  return (
    <article className="flex flex-col bg-site-lighter-grey p-2 border border-border-grey justify-between rounded-3xl">
      <div className="w-full flex justify-between  border-b border-border-grey">
        <h4 className="font-bold">{counterPartyName}</h4>
        <span className="flex gap-1">
          <p>{counterPartyDetails.averageReleaseTime}min(s)</p>
          <p>|</p>
          <span className="flex gap-1">
            <p className="text-green-600 text-center">
              {counterPartyDetails.goodAppraiseCount}
            </p>
            <p>|</p>
            <p className="text-red-700 text-center">
              {counterPartyDetails.badAppraiseCount}
            </p>
          </span>
        </span>
      </div>
      <div className="flex justify-between my-1 py-1 border-b border-border-grey">
        <p className="font-bold">N{amount}</p>
        <span className="flex gap-1 px-2">
          <p>{counterPartyDetails.bankName}</p>
          <p>|</p>
          <p>{counterPartyDetails.accountNo}</p>
        </span>
      </div>
      {side === 0 && status === 10 && (
        <div className="w-full flex justify-center items-end text-sm  gap-2 border-border-grey rounded-full">
          <button className="bg-site-orange py-1 px-4 rounded-l-full w-1/3">
            Pay
          </button>
          <button
            className="bg-site-transparent-orange p-1 w-1/3"
            onClick={() => {
              handleMarkPaid({ orderId, counterPartyDetails });
            }}
          >
            Paid
          </button>
          <button
            className="bg-site-orange  rounded-r-full p-1 w-1/3"
            onClick={() => {
              handleOpenChat && handleOpenChat(counterPartyName, orderId);
            }}
          >
            Chat({unreadMessages})
          </button>
        </div>
      )}

      {side === 1 && status === 10 && (
        <div className="w-full">
          <button
            className="w-full rounded-full bg-site-orange py-1 text-sm"
            onClick={() => {
              handleOpenChat && handleOpenChat(counterPartyName, orderId);
            }}
          >
            Chat({unreadMessages})
          </button>
        </div>
      )}

      {side === 0 && status === 20 && (
        <div className="w-full flex gap-2">
          <button
            className="w-1/2 rounded-full bg-site-orange py-1 text-sm"
            onClick={() => {
              handleSendPaid(orderId);
            }}
          >
            Send Paid
          </button>
          <button
            className="w-1/2 rounded-full bg-site-orange py-1 text-sm"
            onClick={() => {
              handleOpenChat && handleOpenChat(counterPartyName, orderId);
            }}
          >
            Chat({unreadMessages})
          </button>
        </div>
      )}
      {side === 1 && status === 20 && (
        <div className="w-full flex gap-2">
          <button
            disabled={releasing}
            className={`${
              releasing ? "bg-border-grey" : "bg-site-orange"
            } w-1/2 rounded-full py-1 text-sm`}
            onClick={() => {
              handleRelease(orderId, setReleasing);
            }}
          >
            {releasing ? "Releasing" : "Release"}
          </button>
          <button
            className={`${
              releasing ? "bg-border-grey" : "bg-site-orange"
            } w-1/2 rounded-full py-1 text-sm`}
            onClick={() => {
              handleOpenChat && handleOpenChat(counterPartyName, orderId);
            }}
          >
            Chat({unreadMessages})
          </button>
        </div>
      )}
    </article>
  );
}

export default MobilePendingPaymentOrderCard;
