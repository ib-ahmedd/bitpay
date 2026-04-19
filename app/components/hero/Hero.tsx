"use client";

import { useCallback, useEffect, useState } from "react";
import AccountInfoContainer from "./components/AccountInfoContainer";
import UserInfoContainer from "./components/UserInfoContainer";
import AccountsInfoCard from "./components/AccountsInfoCard";
import UserInfoCard from "./components/UserInfoCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import axios from "axios";
import LoadingCircle from "@components/LoadingCircle";
import {
  handleDashBoardDetails,
  handleError,
  handleResetError,
} from "@store/globalSlice";
import ErrorDisplay from "@components/ErrorDisplay";

function Hero() {
  const {
    accessToken,
    apiLink,
    apploaded,
    userDetails,
    isLoggedIn,
    dashBoardDetails,
    pageError,
  } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(true);

  const getUserDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiLink + "/user-details",
        {
          credentialsToken: userDetails.credentials,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const time = Date.now();

      const { data } = response;

      dispatch(
        handleDashBoardDetails({
          lastFetch: time,
          userDetails: data,
          initialFetch: true,
        })
      );
    } catch (err: any) {
      console.log(err);
      dispatch(
        handleError({ type: "PAGE", message: err.response.data.message })
      );
    }
    setLoading(false);
    setFetch(false);
  }, [setLoading, accessToken, userDetails, apiLink, fetch]);

  useEffect(() => {
    if (fetch) {
      if (apploaded && isLoggedIn) {
        if (
          !dashBoardDetails.initialFetch ||
          Date.now() - dashBoardDetails.lastFetch > 60000
        ) {
          getUserDetails();
        }
      }
    }
  }, [getUserDetails, apploaded, isLoggedIn, dashBoardDetails, fetch]);
  return (
    <>
      {pageError ? (
        <ErrorDisplay
          func={() => {
            dispatch(handleResetError({ type: "PAGE" }));
            setFetch(true);
          }}
        />
      ) : (
        <section className="w-full h-[80vh] rounded-3xl xl:mt-5 border-border-grey box-border">
          {loading ? (
            <LoadingCircle text="Getting User Details" />
          ) : (
            <div className="flex h-full flex-col gap-4">
              <div className="w-full flex flex-col gap-4 xl:gap-4 md:flex-row justify-between">
                <UserInfoContainer title="User Details">
                  <UserInfoCard
                    title="Real Name"
                    info={dashBoardDetails.userDetails.realName}
                  />
                  <UserInfoCard
                    title="Nickname"
                    info={dashBoardDetails.userDetails.nickName}
                  />
                  <UserInfoCard
                    title="Bank Account Name"
                    info={"Apex Trade Hub"}
                  />
                  <UserInfoCard
                    title="Total Trades"
                    info={dashBoardDetails.userDetails.totalFinishCount.toString()}
                  />
                  <UserInfoCard
                    title="30 Days Trades"
                    info={dashBoardDetails.userDetails.recentFinishCount.toString()}
                  />
                  <UserInfoCard
                    title="Total Buy Orders"
                    info={dashBoardDetails.userDetails.totalFinishBuyCount.toString()}
                  />
                  <UserInfoCard
                    title="Total Sell Orders"
                    info={dashBoardDetails.userDetails.totalFinishSellCount.toString()}
                  />
                  <UserInfoCard
                    title="Total Buy Orders"
                    info={dashBoardDetails.userDetails.totalFinishBuyCount.toString()}
                  />
                </UserInfoContainer>

                <UserInfoContainer title="Trade Summary">
                  <UserInfoCard
                    title="Average Payment Time"
                    info={
                      dashBoardDetails.userDetails.averageTransferTime +
                      "min(s)"
                    }
                  />
                  <UserInfoCard
                    title="Average Release Time"
                    info={
                      dashBoardDetails.userDetails.averageReleaseTime + "min(s)"
                    }
                  />
                  <UserInfoCard
                    title="Completion Rate"
                    info={
                      dashBoardDetails.userDetails.recentRate.toString() + "%"
                    }
                  />
                  <UserInfoCard
                    title="Account Creation Days"
                    info={dashBoardDetails.userDetails.accountCreateDays.toString()}
                  />
                  <UserInfoCard
                    title="First Trade Days"
                    info={dashBoardDetails.userDetails.firstTradeDays.toString()}
                  />
                  <UserInfoCard
                    title="Reviews Ratio"
                    info={dashBoardDetails.userDetails.goodAppraiseRate.toString()}
                  />
                  <UserInfoCard
                    title="Good Reviews"
                    info={dashBoardDetails.userDetails.goodAppraiseCount.toString()}
                  />
                  <UserInfoCard
                    title="Bad Reviews"
                    info={dashBoardDetails.userDetails.badAppraiseCount.toString()}
                  />
                </UserInfoContainer>
              </div>
              <div className="w-full flex flex-col gap-4 xl:gap-4 md:flex-row justify-between">
                <AccountInfoContainer title="Wallet Info">
                  <AccountsInfoCard
                    title="USDT Total"
                    amount={Number(
                      dashBoardDetails.userDetails.walletBalance
                    ).toFixed(2)}
                    currencySymbol="$"
                  />
                  <AccountsInfoCard
                    title="USDT Available"
                    amount={Number(
                      dashBoardDetails.userDetails.transferBalance
                    ).toFixed(2)}
                    currencySymbol="$"
                  />
                  <AccountsInfoCard
                    title="Average Daily Volume"
                    amount={(
                      Number(dashBoardDetails.userDetails.totalTradeAmount) /
                      dashBoardDetails.userDetails.firstTradeDays
                    )
                      .toFixed(2)
                      .toString()}
                    currencySymbol="$"
                  />
                  <AccountsInfoCard
                    title="30 Days USDT Volume"
                    amount={Number(
                      dashBoardDetails.userDetails.recentTradeAmount
                    ).toFixed(2)}
                    currencySymbol="$"
                  />
                  <AccountsInfoCard
                    title="Total USDT Volume"
                    amount={Number(
                      dashBoardDetails.userDetails.totalTradeAmount
                    ).toFixed(2)}
                    currencySymbol="$"
                  />
                </AccountInfoContainer>
                <AccountInfoContainer title="Bank Info">
                  <AccountsInfoCard
                    title="Bank Balance"
                    amount={"10,000,000"}
                    currencySymbol="NGN"
                  />
                  <AccountsInfoCard
                    title="Bank Balance"
                    amount={"10,000,000"}
                    currencySymbol="NGN"
                  />
                  <AccountsInfoCard
                    title="Daily Volume"
                    amount={"30,000,000"}
                    currencySymbol="NGN"
                  />
                  <AccountsInfoCard
                    title="30 Days Bank Volume"
                    amount={"100,000,000"}
                    currencySymbol="NGN"
                  />
                  <AccountsInfoCard
                    title="Average Daily Volume"
                    amount={"25,000,000"}
                    currencySymbol="NGN"
                  />
                </AccountInfoContainer>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default Hero;
