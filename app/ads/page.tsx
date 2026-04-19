"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import MyAdsSection from "./components/MyAdsSection";
import { AdsPageContext } from "./components/AdsPageContext";
import LoadingCircle from "@components/LoadingCircle";
import { handleAds, handleError, handleResetError } from "@store/globalSlice";
import ErrorDisplay from "@components/ErrorDisplay";

function Ads() {
  const {
    accessToken,
    apiLink,
    userDetails,
    apploaded,
    isLoggedIn,
    ads,
    pageError,
  } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch<AppDispatch>();

  const [fetch, setFetch] = useState(false);
  const [adDetails, setAdetails] = useState({
    selectedAdId: "",
    adSide: 2,
    adOnline: false,
  });
  const [adModalDetails, setAdModalDetails] = useState({
    open: false,
    error: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(false);

  function handleOpenAd(adId: string, side: number, status: 10 | 20 | 30) {
    setAdModalDetails((prev) => {
      return { ...prev, open: true };
    });
    setAdetails((prev) => {
      return {
        ...prev,
        selectedAdId: adId,
        adSide: side,
        adOnline: status === 10,
      };
    });
  }

  async function handleRemoveAd(adId: string) {
    try {
      await axios.post(
        apiLink + "/remove-ad",
        {
          credentialsToken: userDetails.credentials,
          adId: adId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFetch(true);
    } catch (err: any) {
      console.log(err);
      dispatch(
        handleError({ type: "POPUP", message: err.response.data.message })
      );
    }
  }

  const getAds = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        apiLink + "/get-ads",
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
      dispatch(
        handleAds({
          ads: response.data.items,
          initialFetch: true,
          lastFetch: time,
        })
      );
    } catch (err: any) {
      dispatch(
        handleError({ type: "PAGE", message: err.response.data.message })
      );
      console.log(err);
    }
    setFetch(false);
    setLoading(false);
  }, [userDetails, accessToken, apiLink, fetch, setLoading, setFetch]);

  useEffect(() => {
    if (apploaded && isLoggedIn) {
      if (!ads.initialFetch) {
        getAds();
      } else if (fetch) {
        getAds();
      } else if (Date.now() - ads.lastFetch > 60000) {
        getAds();
      }
    }
  }, [getAds, fetch, apploaded, isLoggedIn]);

  const adsPageContextValue = {
    ads: ads.ads,
    fetch,
    setFetch,
    adDetails,
    setAdetails,
    adModalDetails,
    setAdModalDetails,
    handleOpenAd,
    handleRemoveAd,
  };
  return (
    <AdsPageContext.Provider value={adsPageContextValue}>
      <main>
        {loading && !pageError ? (
          <LoadingCircle text="Getting Ads" />
        ) : (
          <MyAdsSection />
        )}
        {pageError && (
          <ErrorDisplay
            func={() => {
              dispatch(handleResetError({ type: "PAGE" }));
              setFetch(true);
            }}
          />
        )}
      </main>
    </AdsPageContext.Provider>
  );
}
export default Ads;
