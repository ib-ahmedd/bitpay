import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import LabeledInput from "./LabeledInput";
import { checkIfNumber } from "@utils";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import LoadingCircle from "@components/LoadingCircle";
import { handleError } from "@store/globalSlice";
import { AdsPageContext } from "./AdsPageContext";
import InModalErroDisplay from "@components/InModalErrorDisplay";

function EditAdModal() {
  const { apiLink, accessToken, userDetails, balanceDetails } = useSelector(
    (state: RootState) => state.global
  );

  const dispatch = useDispatch<AppDispatch>();

  const [adInfo, setAdInfo] = useState({
    id: "",
    priceType: "",
    premium: "",
    price: "",
    minAmount: "",
    maxAmount: "",
    remark: "",
    tradingPreferenceSet: {},
    paymentIds: [],
    quantity: "",
    paymentPeriod: "",
  });

  const [fetchAdDetails, setFetchAdDetails] = useState(true);
  const [setting, setSetting] = useState(false);
  const [loading, setLoading] = useState(true);

  const { adDetails, setFetch, adModalDetails, setAdModalDetails } =
    useContext(AdsPageContext);

  const getAdDetails = useCallback(async () => {
    try {
      const response = await axios.post(
        apiLink + "/ad-details",
        {
          credentialsToken: userDetails.credentials,
          id: adDetails.selectedAdId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data } = response;
      setAdInfo((prev) => {
        return {
          ...prev,
          id: data.id,
          priceType: data.priceType,
          premium: data.premium,
          price: data.price,
          minAmount: data.minAmount,
          maxAmount: data.maxAmount,
          remark: data.remark,
          tradingPreferenceSet: {},
          paymentIds: data.paymentIds,
          quantity: data.lastQuantity,
          paymentPeriod: data.paymentPeriod,
        };
      });
    } catch (err: any) {
      console.log(err);
      setAdModalDetails((prev: any) => {
        return {
          ...prev,
          error: true,
          errorMessage: err.response.data.message,
        };
      });
    }
    setFetchAdDetails(false);
    setLoading(false);
  }, [accessToken, apiLink, userDetails, fetchAdDetails]);

  async function handleUpdateAd(actionType: "MODIFY" | "ACTIVE") {
    setSetting(true);
    try {
      await axios.post(
        apiLink + "/update-ad",
        {
          credentialsToken: userDetails.credentials,
          adInfo: {
            ...adInfo,
            actionType: actionType,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFetch(true);
      setAdModalDetails((prev: any) => {
        return { ...prev, open: false };
      });
    } catch (err: any) {
      console.log(err);
      dispatch(
        handleError({ type: "POPUP", message: err.response.data.message })
      );
    }
    setSetting(false);
    setLoading(false);
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setAdInfo((prev) => {
      if (checkIfNumber(value)) {
        return { ...prev, [name]: value };
      } else {
        return prev;
      }
    });
  }

  function setMaxQuantity() {
    setAdInfo((prev) => {
      return { ...prev, quantity: balanceDetails.walletBalance };
    });
  }

  useEffect(() => {
    if (fetchAdDetails) {
      getAdDetails();
    }
  }, [getAdDetails, fetchAdDetails]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <form
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="w-full fixed top-0 left-0 z-30 flex justify-center items-center p-2 lg:p-10">
        {loading ? (
          <div className="h-[70vh] w-full flex flex-col gap-2 justify-center items-center">
            <LoadingCircle text="Getting Ad Details" />
          </div>
        ) : (
          <div className="mt-14 w-full md:w-[30em] p-1 md:p-3 border-2 border-border-grey bg-site-lighter-grey rounded-3xl flex flex-col gap-2">
            <div className="relative w-full">
              <h2
                className={`w-full text-center font-bold border-b ${
                  adDetails.side === 0 ? "text-green-500" : "text-red-500"
                } border-border-grey text-lg`}
              >
                {adDetails.side === 0 ? "BUY" : "SELL"}
              </h2>
              <button
                className="absolute top-0 right-3 font-bold text-xl"
                onClick={() => {
                  setAdModalDetails((prev: any) => {
                    return { ...prev, open: false };
                  });
                }}
              >
                <FontAwesomeIcon icon={faClose as IconDefinition} />
              </button>
            </div>

            {adModalDetails.error ? (
              <InModalErroDisplay
                func={() => {
                  setFetchAdDetails(true);
                  setAdModalDetails((prev: any) => {
                    return { ...prev, error: false, errorMessage: "" };
                  });
                }}
                message={adModalDetails.errorMessage}
              />
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <LabeledInput
                    name="price"
                    label="Price"
                    handleChange={handleChange}
                    value={adInfo.price}
                    currency="NGN"
                    style={1}
                  />
                  <LabeledInput
                    name="quantity"
                    label="Quantity"
                    handleChange={handleChange}
                    setMaxQuantity={setMaxQuantity}
                    value={adInfo.quantity}
                    currency="USDT"
                    style={3}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between gap-2">
                    <LabeledInput
                      currency="NGN"
                      handleChange={handleChange}
                      label="Min Amount"
                      name="minAmount"
                      value={adInfo.minAmount}
                      style={2}
                    />
                    <LabeledInput
                      currency="NGN"
                      handleChange={handleChange}
                      label="Max Amount"
                      name="maxAmount"
                      value={adInfo.maxAmount}
                      style={2}
                    />
                  </div>
                  <div>
                    <label className="ml-4" htmlFor="remark">
                      Remark
                    </label>
                    <textarea
                      className="w-full bg-site-dark-grey outline-none border border-border-grey rounded-3xl py-2 px-4 h-[10em]"
                      name="remark"
                      value={adInfo.remark}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="ml-4" htmlFor="paymentTime">
                    Payment Time
                  </label>
                  <select
                    className="w-full bg-site-dark-grey outline-none py-2 rounded-full px-4"
                    name="paymentTime"
                    value={adInfo.paymentPeriod}
                    onChange={handleChange}
                  >
                    <option value={15}>15 mins</option>
                    <option value={30}>30 mins</option>
                  </select>
                </div>
                {setting ? (
                  <button className="w-full bg-border-grey p-2 rounded-full mt-4 font-bold">
                    Setting...
                  </button>
                ) : (
                  <button
                    className="w-full bg-site-orange p-2 rounded-full mt-4 font-bold "
                    onClick={() => {
                      handleUpdateAd(adDetails.isOnline ? "MODIFY" : "ACTIVE");
                    }}
                  >
                    Set
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="fixed w-full h-screen top-0 left-0 z-20 bg-black opacity-70" />
    </form>
  );
}
export default EditAdModal;
