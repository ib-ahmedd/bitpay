"use client";
import { AppDispatch, RootState } from "@store";
import {
  handleAppLoaded,
  handleGetOrders,
  handleOrdersLoading,
  handleOrdersResult,
  handleError,
  handleResetError,
  handleSiteLogin,
  handleOrdersError,
} from "@store/globalSlice";
import { LayoutProps } from "@types";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "./components/AppContext";
import axios from "axios";
import PopupErrorDisplay from "@components/PopupErrorDisplay";

function AppWrapper({ children }: LayoutProps) {
  const { isLoggedIn, orders, userDetails, apiLink, accessToken } = useSelector(
    (state: RootState) => state.global
  );
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const getPendingOrders = useCallback(async () => {
    console.log("hit");
    dispatch(handleOrdersLoading(true));

    try {
      const { credentials } = userDetails;
      const pendingOrdersResponse = await axios.post(
        apiLink + "/pending-orders",
        {
          credentialsToken: credentials,
          page: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { pendingReleases, pendingPayments } = pendingOrdersResponse.data;

      const balancesResponse = await axios.post(
        apiLink + "/account-balances",
        {
          credentialsToken: credentials,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const accountBalances = {
        bankBalance: "10,000,000",
        walletBalance: balancesResponse.data.transferBalance,
      };

      dispatch(
        handleOrdersResult({
          pendingPayments,
          pendingReleases,
          accountBalances,
        })
      );
    } catch (err: any) {
      console.log(err);
      if (!pathname.includes("pending")) {
        dispatch(
          handleError({ type: "POPUP", message: err.response.data.message })
        );
        dispatch(handleOrdersError({ message: err.response.data.message }));
      } else {
        dispatch(handleOrdersError({ message: err.response.data.message }));
      }
    }

    dispatch(handleOrdersLoading(false));
  }, [
    userDetails,
    accessToken,
    apiLink,
    handleOrdersLoading,
    handleError,
    pathname,
  ]);

  useEffect(() => {
    if (isLoggedIn && orders.fetchOrders) {
      getPendingOrders();
    }
  }, [isLoggedIn, orders]);

  useEffect(() => {
    const getDataInterval = setInterval(() => {
      dispatch(handleGetOrders());
    }, 15000);

    return () => clearInterval(getDataInterval);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const storedUserDetails = localStorage.getItem("userDetails");
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        dispatch(handleSiteLogin(userDetails));
      } else {
        router.push("/auth");
      }
    }

    dispatch(handleAppLoaded());
    dispatch(handleResetError({ type: "PAGE" }));
  }, [pathname]);

  useEffect(() => {}, []);

  const appContextValue = {};
  return (
    <>
      <AppContext.Provider value={appContextValue}>
        <PopupErrorDisplay />
        {children}
      </AppContext.Provider>
    </>
  );
}

export default AppWrapper;
