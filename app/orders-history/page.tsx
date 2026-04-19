"use client";
import { useDispatch, useSelector } from "react-redux";
import MobileOrdersHistoryContainer from "./components/MobileOrdersHistoryContainer";
import OrdersHistoryContainer from "./components/OrdersHistoryContainer";
import { AppDispatch, RootState } from "@store";
import { useCallback, useEffect, useState } from "react";
import FilterCountBar from "./components/FilterCountBar";
import PageHandler from "./components/PageHandler";
import { Filters } from "@types";
import { OrdersPageContext } from "./components/OrderPageContext";
import Chatbox from "@app/components/chatbox/Chatbox";
import axios from "axios";
import LoadingCircle from "@components/LoadingCircle";
import { handleError, handleResetError } from "@store/globalSlice";
import ErrorDisplay from "@components/ErrorDisplay";

function OrdersHistory() {
  const {
    accessToken,
    apiLink,
    apploaded,
    isLoggedIn,
    userDetails,
    pageError,
  } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch<AppDispatch>();
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    type: "none",
    status: "none",
  });
  const [sideStatus, setSideStatus] = useState({
    side: 2,
    status: 0,
  });
  const [getData, setGetData] = useState(true);
  const [chatDetails, setChatDetails] = useState({
    orderId: "",
    userName: "",
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState({
    orders: [],
    count: 0,
    itemsCount: 0,
  });

  const getOrdersHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiLink + "/orders-history",
        {
          credentialsToken: userDetails.credentials,
          page: pageNumber,
          side: sideStatus.side,
          status: sideStatus.status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setOrdersData((prev) => {
        return { ...prev, ...response.data };
      });
    } catch (err: any) {
      console.log(err);
      dispatch(
        handleError({ type: "PAGE", message: err.response.data.message })
      );
    }
    setLoading(false);
    setGetData(false);
  }, [
    getData,
    setLoading,
    apiLink,
    userDetails,
    accessToken,
    pageNumber,
    sideStatus,
    setOrdersData,
  ]);

  // const orders = sampleOrdersHistoryArray;

  // const count = 20104;

  // const itemsCount = 0;

  const maxPageNo = Math.floor(ordersData.count / 10);

  function handleFilters(text: string) {
    if (text === "sell" || text === "buy") {
      setFilters((prev) => {
        if (text !== prev.type) {
          setSideStatus((prev) => {
            return { ...prev, side: text === "sell" ? 1 : 0 };
          });
          return { ...prev, type: text };
        } else {
          setSideStatus((prev) => {
            return { ...prev, side: 2 };
          });
          return {
            ...prev,
            type: "none",
          };
        }
      });
    } else if (
      text === "completed" ||
      text === "canceled" ||
      text === "pending payment" ||
      text === "pending release"
    ) {
      setFilters((prev) => {
        if (prev.status !== text) {
          return {
            ...prev,
            status: text,
          };
        } else {
          return {
            ...prev,
            status: "none",
          };
        }
      });
      if (text === filters.status) {
        setSideStatus((prev) => {
          return { ...prev, status: 0 };
        });
      } else {
        switch (text) {
          case "canceled":
            setSideStatus((prev) => {
              return { ...prev, status: 40 };
            });
            break;
          case "completed":
            setSideStatus((prev) => {
              return { ...prev, status: 50 };
            });
            break;
          case "pending payment":
            setSideStatus((prev) => {
              return { ...prev, status: 10 };
            });
            break;
          case "pending release":
            setSideStatus((prev) => {
              return { ...prev, status: 20 };
            });
        }
      }
    }
  }

  function applyFilters() {
    setGetData(true);
    console.log(filters, sideStatus);
  }

  function resetFilters() {
    setFilters((prev) => {
      return { ...prev, type: "none", status: "none" };
    });

    setSideStatus((prev) => {
      return { ...prev, side: 2, status: 0 };
    });
  }

  function handleChatOpen(orderId: string, userName: string) {
    setChatDetails((prev) => {
      return { ...prev, orderId: orderId, userName: userName };
    });
    setChatOpen(true);
  }

  const ordersPageContextValue = {
    orders: ordersData.orders,
    count: ordersData.count,
    itemsCount: ordersData.itemsCount,
    maxPageNo,
    pageNumber,
    setPageNumber,
    filters,
    setFilters,
    handleFilters,
    applyFilters,
    resetFilters,
    chatOpen,
    setChatOpen,
    handleChatOpen,
  };

  useEffect(() => {
    if (apploaded && isLoggedIn && getData) {
      getOrdersHistory();
    }
  }, [getOrdersHistory, apploaded, isLoggedIn, getData]);
  return (
    <OrdersPageContext.Provider value={ordersPageContextValue}>
      {chatOpen && (
        <Chatbox
          userName={chatDetails.userName}
          orderId={chatDetails.orderId}
          setChatOpen={setChatOpen}
        />
      )}
      <main className="pb-8">
        {pageError ? (
          <ErrorDisplay
            func={() => {
              dispatch(handleResetError({ type: "PAGE" }));
              setGetData(true);
            }}
          />
        ) : (
          <>
            {loading ? (
              <LoadingCircle text="Getting Orders" />
            ) : (
              <>
                <FilterCountBar
                  pageNumber={pageNumber}
                  count={ordersData.count}
                  itemsCount={ordersData.itemsCount}
                />
                <OrdersHistoryContainer orders={ordersData.orders} />
                <MobileOrdersHistoryContainer orders={ordersData.orders} />
                <PageHandler
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  count={ordersData.count}
                />
              </>
            )}
          </>
        )}
      </main>
    </OrdersPageContext.Provider>
  );
}

export default OrdersHistory;
