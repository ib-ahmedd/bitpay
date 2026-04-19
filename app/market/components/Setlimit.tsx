import { MarketParamsProps } from "@types";
import { checkIfNumber, handleLocalStorage } from "@utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function SetLimit({
  marketParams,
  handleSide,
  setFetch,
  setMarketParams,
}: SetLimitProps) {
  const [input, setInput] = useState(marketParams.limit);
  const [buttonText, setButtonText] = useState<"Reset" | "Set">("Reset");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (input !== marketParams.limit) {
      setButtonText("Set");
    } else {
      setButtonText("Reset");
    }

    if (input === "5000" && marketParams.limit === "5000") {
      setButtonDisabled(true);
    } else if (Number(input) < 4500) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [input, marketParams]);

  function handleSet() {
    if (buttonText === "Set") {
      setMarketParams((prev) => {
        return { ...prev, limit: input };
      });
    } else if (buttonText === "Reset") {
      setInput("5000"),
        setMarketParams((prev) => {
          return { ...prev, limit: "5000" };
        });
    }
    setFetch(true);
  }
  return (
    <div className="flex items-center w-[9em] md:w-1/3 text-sm md:text-base">
      <p className="hidden md:block mr-2">Limit: </p>
      <input
        className="bg-site-dark-grey w-[65%] md:w-[10em] outline-none border border-border-grey py-1 px-2 md:px-4 rounded-l-full"
        type="text"
        value={input}
        onChange={(e) => {
          setInput((prev) => {
            const { value } = e.target;
            if (checkIfNumber(value) && Number(value) < 10000001) {
              return value;
            } else {
              return prev;
            }
          });
        }}
      />
      <button
        disabled={buttonDisabled}
        className={`${
          buttonDisabled
            ? "bg-border-grey text-site-text-gray"
            : "bg-site-orange hover:bg-site-orange-hover"
        } border border-border-grey py-1 w-[35%] md:w-fit md:px-3 rounded-r-full`}
        onClick={() => {
          handleSet();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

interface MarketParams {
  side: string;
  limit: string;
}

interface SetLimitProps {
  marketParams: {
    side: string;
    limit: string;
  };
  handleSide: (side: string) => void;
  setMarketParams: Dispatch<SetStateAction<MarketParams>>;
  setFetch: Dispatch<SetStateAction<boolean>>;
}

export default SetLimit;
