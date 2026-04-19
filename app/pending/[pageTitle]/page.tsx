"use client";

import Chatbox from "@app/components/chatbox/Chatbox";
import { useParams } from "next/navigation";
import PageTitleBar from "./components/PageTitleBar";
import PendingPaymentOrderCard from "./components/PendingOrderCard";
import MobilePendingPaymentOrderCard from "./components/MobilePendingOrderCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PageDetails } from "@types";
import LoadingCircle from "@components/LoadingCircle";
import { PendingPageContext } from "./components/PendingPageContext";
import {
  handleGetOrders,
  handlePendingOrdersSide,
  handleResetError,
} from "@store/globalSlice";
import axios from "axios";
import ErrorDisplay from "@components/ErrorDisplay";

function Pending() {
  const { pageTitle } = useParams();

  const {
    pendingPayments,
    pendingReleases,
    orders,
    accessToken,
    apiLink,
    userDetails,
    pageError,
  } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch<AppDispatch>();

  const [pageDetails, setPageDetails] = useState<PageDetails>({
    page: "",
    status: 10,
    orders: {
      buyOrders: [],
      sellOrders: [],
    },
    count: 0,
  });

  const [activeSide, setActiveSide] = useState<"0" | "1">();

  const [chatDetails, setChatDetails] = useState({
    userName: "",
    orderId: "",
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [messageSending, setMessageSending] = useState(false);

  function handleOpenChat(userName: string, orderId: string) {
    setChatDetails((prev) => {
      return { ...prev, userName: userName, orderId: orderId };
    });
    setChatOpen(true);
  }

  async function handleMarkPaid({
    orderId,
    counterPartyDetails,
    setMarkingPaid,
  }: {
    orderId: string;
    counterPartyDetails: { paymentId: string; paymentType: string };
    setMarkingPaid: Dispatch<SetStateAction<boolean>>;
  }) {
    const { credentials } = userDetails;
    setMarkingPaid(true);
    try {
      const response = await axios.post(
        apiLink + "/mark-paid",
        {
          credentialsToken: credentials,
          orderId: orderId,
          paymentId: counterPartyDetails.paymentId,
          paymentType: counterPartyDetails.paymentType,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);
      dispatch(handleGetOrders());
    } catch (err) {
      console.log(err);
      setMarkingPaid(false);
    }
  }

  async function handleSendPaid(orderId: string) {
    setMessageSending(true);
    const { credentials } = userDetails;
    try {
      const response = await axios.post(
        apiLink + "/send-message",
        {
          credentialsToken: credentials,
          message: "paid",
          orderId: orderId,
          contentType: "str",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setMessageSending(false);
  }

  async function handleRelease(
    orderId: string,
    setReleasing: Dispatch<SetStateAction<boolean>>
  ) {
    setReleasing(true);
    const { credentials } = userDetails;
    try {
      const response = await axios.post(
        apiLink + "/release-coins",
        {
          credentialsToken: credentials,
          orderId: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);
      dispatch(handleGetOrders());
    } catch (err) {
      console.log(err);
      setReleasing(false);
    }
  }

  useEffect(() => {
    setPageDetails((prev) => {
      if (pageTitle === "payments") {
        setActiveSide(pendingPayments.side);
        if (pendingPayments.count > 0) {
          if (
            pendingPayments.orders.buyOrders.length < 1 &&
            pendingPayments.orders.sellOrders.length > 0 &&
            pendingPayments.side === "0"
          ) {
            setActiveSide("1");
            dispatch(
              handlePendingOrdersSide({ side: "1", status: pageDetails.status })
            );
          }
        }

        if (pendingPayments.count > 0) {
          if (
            pendingPayments.orders.sellOrders.length < 1 &&
            pendingPayments.orders.buyOrders.length > 0 &&
            pendingPayments.side === "1"
          ) {
            setActiveSide("0");
            dispatch(
              handlePendingOrdersSide({ side: "0", status: pageDetails.status })
            );
          }
        }
        return {
          ...prev,
          page: "Pending Payments",
          status: 10,
          orders: pendingPayments.orders,
          count: pendingPayments.count,
        };
      } else if (pageTitle === "releases") {
        setActiveSide(pendingReleases.side);
        if (pendingReleases.count > 0) {
          if (
            pendingReleases.orders.buyOrders.length < 1 &&
            pendingReleases.orders.sellOrders.length > 0 &&
            pendingReleases.side === "0"
          ) {
            setActiveSide("1");
            dispatch(
              handlePendingOrdersSide({ side: "1", status: pageDetails.status })
            );
          }
        }

        if (pendingReleases.count > 0) {
          if (
            pendingReleases.orders.sellOrders.length < 1 &&
            pendingReleases.orders.buyOrders.length > 0 &&
            pendingReleases.side === "1"
          ) {
            setActiveSide("0");
            dispatch(
              handlePendingOrdersSide({ side: "0", status: pageDetails.status })
            );
          }
        }
        return {
          ...prev,
          page: "Pending Releases",
          status: 20,
          orders: pendingReleases.orders,
          count: pendingReleases.count,
        };
      } else {
        return prev;
      }
    });
  }, [setPageDetails, pendingPayments, pendingReleases]);

  const pendingPageContextValue = {
    handleRelease,
    handleMarkPaid,
    handleSendPaid,
    messageSending,
    setMessageSending,
    activeSide,
    setActiveSide,
    pageTitle,
    pendingPayments,
    pendingReleases,
    orders,
    pageDetails,
    setPageDetails,
    chatDetails,
    setChatDetails,
    chatOpen,
    setChatOpen,
    handleOpenChat,
  };

  return (
    <main>
      <PendingPageContext.Provider value={pendingPageContextValue}>
        {orders.ordersError ? (
          <ErrorDisplay
            func={() => {
              dispatch(handleGetOrders());
              dispatch(handleResetError({ type: "PAGE" }));
              dispatch(handleResetError({ type: "POPUP" }));
            }}
          />
        ) : (
          <>
            {chatOpen && (
              <Chatbox
                userName={chatDetails.userName}
                orderId={chatDetails.orderId}
                setChatOpen={setChatOpen}
              />
            )}
            <PageTitleBar />
            {pageDetails.count === 0 && orders.ordersLoading && (
              <LoadingCircle text="Getting Orders" />
            )}
            {pageDetails.count > 0 && (
              <section className="w-full hidden md:flex flex-col gap-2 rounded-3xl border border-border-grey bg-site-lighter-grey p-4">
                <table className="w-full">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="hidden lg:table-column" />
                    <col style={{ width: "10px" }} />
                    <col style={{ width: "10em" }} />
                  </colgroup>
                  <thead>
                    <tr className="border border-border-grey h-12 text-site-text-gray">
                      <th>Name</th>
                      <th>Bank Details</th>
                      <th>Remarks</th>
                      <th>Amounts</th>
                      <th className="hidden lg:table-cell">Price</th>
                      <th>Chat</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSide === "0"
                      ? pageDetails.orders.buyOrders.map((item) => (
                          <PendingPaymentOrderCard
                            key={item.orderId}
                            {...item}
                            handleOpenChat={handleOpenChat}
                          />
                        ))
                      : pageDetails.orders.sellOrders.map((item) => (
                          <PendingPaymentOrderCard
                            key={item.orderId}
                            {...item}
                            handleOpenChat={handleOpenChat}
                          />
                        ))}
                    {/* {sampleOrdersHistoryArray.map((item) => (
                  <PendingPaymentOrderCard
                    key={item.orderId}
                    handleOpenChat={handleOpenChat}
                    {...item}
                  />
                ))} */}
                  </tbody>
                </table>
              </section>
            )}
            {!orders.ordersLoading && pageDetails.count === 0 && (
              <section className="w-full h-[70vh] bg-site-lighter-grey border border-border-grey rounded-3xl flex justify-center items-center text-xl text-site-text-gray font-bold">
                <p>No {pageDetails.page}.</p>
              </section>
            )}
            <section className="w-full flex gap-2 md:hidden flex-col">
              {activeSide === "0"
                ? pageDetails.orders.buyOrders.map((item) => (
                    <MobilePendingPaymentOrderCard
                      key={item.orderId}
                      {...item}
                      handleOpenChat={handleOpenChat}
                    />
                  ))
                : pageDetails.orders.sellOrders.map((item) => (
                    <MobilePendingPaymentOrderCard
                      key={item.orderId}
                      {...item}
                      handleOpenChat={handleOpenChat}
                    />
                  ))}
            </section>
          </>
        )}
      </PendingPageContext.Provider>
    </main>
  );
}
export default Pending;
