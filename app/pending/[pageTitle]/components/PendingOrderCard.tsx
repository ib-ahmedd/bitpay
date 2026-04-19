import { AppDispatch, RootState } from "@store";
import { handleGetOrders } from "@store/globalSlice";
import { Order } from "@types";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PendingPageContext } from "./PendingPageContext";

function PendingPaymentOrderCard({
  orderId,
  targetUserId,
  counterPartyName,
  amount,
  price,
  unreadMessages,
  handleOpenChat,
  status,
  side,
}: Order) {
  const { apiLink, accessToken, userDetails } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch<AppDispatch>();

  const { messageSending, handleRelease, handleMarkPaid, handleSendPaid } =
    useContext(PendingPageContext);

  const [counterPartyDetails, setCounterPartyDetails] = useState({
    averageReleaseTime: "",
    goodAppraiseCount: 0,
    badAppraiseCount: 0,
    accountNo: "",
    bankName: "",
    paymentId: "",
    paymentType: "",
  });
  const [markingPaid, setMarkingPaid] = useState(false);

  const { credentials } = userDetails;

  const getCounterPartyDetails = useCallback(async () => {
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

  const [releasing, setReleasing] = useState(false);

  useEffect(() => {
    getCounterPartyDetails();
  }, [getCounterPartyDetails]);

  return (
    <tr className="border border-border-grey text-center">
      <td className="font-bold">{counterPartyName}</td>
      <td>
        <p>{counterPartyDetails.bankName} </p>
        <p className="font-bold">{counterPartyDetails.accountNo}</p>
      </td>
      <td>
        <span className="font-bold flex justify-center gap-1">
          <p className="text-green-600 text-center">
            {counterPartyDetails.goodAppraiseCount}
          </p>
          <p>|</p>
          <p className="text-red-700 text-center">
            {counterPartyDetails.badAppraiseCount}
          </p>
        </span>
        <p>{counterPartyDetails.averageReleaseTime} min(s)</p>
      </td>

      <td>
        <p className="font-bold">N{amount}</p>
        <p>${(Number(amount) / Number(price)).toFixed(2)}</p>
      </td>
      <td
        className={`hidden lg:table-cell ${
          side === 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {price}
      </td>
      <td>
        <div className="px-2">
          <button
            onClick={() => {
              handleOpenChat && handleOpenChat(counterPartyName, orderId);
            }}
            className="border border-border-grey px-6 rounded-full bg-site-dark-grey hover:bg-border-grey"
          >
            {unreadMessages}
          </button>
        </div>
      </td>
      <td>
        {side === 0 && status === 10 && !markingPaid && (
          <div className="w-fit flex gap-2 px-2">
            <button className="bg-site-orange py-1 px-4 rounded-full w-[5em]">
              Pay
            </button>
            <button
              className="bg-site-transparent-orange border border-site-orange rounded-full p-1 w-[5em]"
              onClick={() => {
                handleMarkPaid({
                  orderId,
                  counterPartyDetails,
                  setMarkingPaid,
                });
              }}
            >
              Paid
            </button>
          </div>
        )}
        {status === 10 && side === 0 && markingPaid && (
          <button disabled className="py-1 px-2 bg-border-grey rounded-full">
            Marking Paid...
          </button>
        )}
        {side === 0 && status === 20 && (
          <div>
            {messageSending ? (
              <button
                disabled
                className="bg-border-grey py-2 px-4 rounded-full w-[7em]"
              >
                Sending...
              </button>
            ) : (
              <button
                className="bg-site-orange py-2 px-4 rounded-full w-[7em]"
                onClick={() => {
                  handleSendPaid(orderId);
                }}
              >
                Send Paid
              </button>
            )}
          </div>
        )}
        {side === 1 && status === 10 && (
          <button
            className="bg-site-orange py-2 px-4 rounded-full w-[5em] md:w-[7em]"
            onClick={() => {
              handleOpenChat && handleOpenChat(counterPartyName, orderId);
            }}
          >
            Open Chat
          </button>
        )}
        {side === 1 && status === 20 && (
          <button
            disabled={releasing}
            className={`${
              releasing ? "bg-border-grey" : "bg-site-orange"
            }  py-2 px-4 rounded-full w-[5em] md:w-[7em]`}
            onClick={() => {
              handleRelease(orderId, setReleasing);
            }}
          >
            {releasing ? "Releasing" : "Release"}
          </button>
        )}
      </td>
    </tr>
  );
}
export default PendingPaymentOrderCard;
