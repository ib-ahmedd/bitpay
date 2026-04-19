"use client";
import { useCallback, useEffect, useState } from "react";
import MarketAdsTable from "./components/MarketAdsTable";
import axios from "axios";
import SetLimit from "./components/Setlimit";
import BuySellBtns from "./components/BuySellBtns";
import ReloadBtn from "./components/ReloadBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import LoadingCircle from "@components/LoadingCircle";
import LoadingSetLimit from "./components/LoadingSetLimit";
import MobileAdTable from "./components/MobileAdTable";
import {
  handleError,
  handleMarketAds,
  handleResetError,
} from "@store/globalSlice";
import { handleLocalStorage } from "@utils";
import { MarketParams } from "@types";
import ErrorDisplay from "@components/ErrorDisplay";

function MarketPage() {
  const {
    accessToken,
    apiLink,
    userDetails,
    apploaded,
    isLoggedIn,
    marketAds,
    pageError,
  } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch<AppDispatch>();

  const storedMarketParams: MarketParams = handleLocalStorage(
    "GET",
    "marketParams"
  );

  const [fetch, setFetch] = useState(false);
  const [marketParams, setMarketParams] = useState(
    storedMarketParams
      ? storedMarketParams
      : {
          side: "0",
          limit: "5000",
        }
  );
  const [loading, setLoading] = useState(false);

  function handleReload() {
    setLoading(true);
    setFetch(true);
  }

  function handleSide(side: string) {
    setMarketParams((prev) => {
      return { ...prev, side: side };
    });
    setFetch(true);
  }

  const getMarketAds = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiLink + "/market-ads",
        {
          credentialsToken: userDetails.credentials,
          side: marketParams.side,
          limit: Number(marketParams.limit),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { items } = response.data;
      const time = Date.now();
      dispatch(
        handleMarketAds({ lastFetch: time, ads: items, initialFetch: true })
      );
    } catch (err: any) {
      console.log(err);
      dispatch(
        handleError({ type: "PAGE", message: err.response.data.message })
      );
    }
    setLoading(false);
    setFetch(false);
  }, [marketParams, accessToken, apiLink, fetch]);

  useEffect(() => {
    if (apploaded && isLoggedIn) {
      if (!marketAds.initialFetch) {
        getMarketAds();
      } else if (fetch) {
        handleLocalStorage("SET", "marketParams", JSON.stringify(marketParams));
        getMarketAds();
      } else if (Date.now() - marketAds.lastFetch > 60000) {
        getMarketAds();
      }
    }
  }, [getMarketAds, fetch, apploaded, isLoggedIn, marketAds]);

  return (
    <main>
      {pageError ? (
        <ErrorDisplay
          func={() => {
            dispatch(handleResetError({ type: "PAGE" }));
            setFetch(true);
          }}
        />
      ) : (
        <section className="px-1 sm:px-2 lg:px-4 py-1 rounded-3xl">
          {loading ? (
            <>
              <LoadingSetLimit
                value={marketParams.limit}
                side={marketParams.side}
              />
              <LoadingCircle text="Getting Market Ads" />
            </>
          ) : (
            <>
              <div className="w-full flex justify-between items-center gap-2 mb-2">
                <SetLimit
                  setFetch={setFetch}
                  setMarketParams={setMarketParams}
                  handleSide={handleSide}
                  marketParams={marketParams}
                />
                <BuySellBtns
                  marketParams={marketParams}
                  setMarketParams={setMarketParams}
                  setFetch={setFetch}
                />
                <ReloadBtn handleReload={handleReload} />
              </div>
              <MarketAdsTable
                marketAds={marketAds.ads}
                marketParams={marketParams}
              />
              <MobileAdTable
                marketAds={marketAds.ads}
                marketParams={marketParams}
              />
            </>
          )}
        </section>
      )}
    </main>
  );
}

export default MarketPage;
