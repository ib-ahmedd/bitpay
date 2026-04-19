import { Ad } from "@types";
import { addCommasToAmounts } from "@utils";

function AdCard({
  id,
  side,
  price,
  lastQuantity,
  maxAmount,
  minAmount,
  status,
  handleOpenAd,
  handleRemoveAd,
}: Ad) {
  return (
    <article className="bg-site-lighter-grey border border-border-grey p-2 w-full rounded-3xl mt-1">
      <div className="flex justify-between border-b border-border-grey">
        {side === 0 ? (
          <h3 className="font-bold text-green-500">BUY</h3>
        ) : (
          <h3 className="font-bold text-red-500">SELL</h3>
        )}

        <p className={`text-sm ${status !== 10 && "text-site-text-gray"}`}>
          {status === 10 ? "Online" : "Offline"}
        </p>
      </div>

      <div className="py-1">
        <span className="flex justify-between">
          <p>Price: </p>
          <p>{price}</p>
        </span>
        <span className="flex justify-between">
          <p>Qty: </p>
          <p>{lastQuantity}</p>
        </span>
        <span className="flex justify-between">
          <p>Min: </p>
          <p>N{addCommasToAmounts(Number(minAmount))}</p>
        </span>
        <span className="flex justify-between">
          <p>Max: </p>
          <p>N{addCommasToAmounts(Number(maxAmount))}</p>
        </span>
      </div>
      {status === 10 ? (
        <div className="w-full flex justify-between gap-2 ">
          <button
            className="border rounded-full border-border-grey p-1 w-1/2 hover:bg-border-grey"
            onClick={() => {
              handleRemoveAd && handleRemoveAd(id);
            }}
          >
            Remove
          </button>
          <button
            className="border rounded-full border-border-grey p-1 w-1/2 hover:bg-border-grey"
            onClick={() => {
              handleOpenAd && handleOpenAd(id, side, status);
            }}
          >
            Update
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-end">
          <button
            className="w-full p-1 bg-site-orange rounded-full"
            onClick={() => {
              handleOpenAd && handleOpenAd(id, side, status);
            }}
          >
            List
          </button>
        </div>
      )}
    </article>
  );
}

export default AdCard;
