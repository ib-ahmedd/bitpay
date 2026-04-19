import { MarketAd } from "@types";

function MobileAdRow({
  nickName,
  lastQuantity,
  price,
  minAmount,
  maxAmount,
  marketParams,
}: MarketAd) {
  return (
    <article className="w-full flex justify-between bg-site-lighter-grey border border-border-grey py-1 px-2 rounded-full">
      <h4 className="w-8/12 sm:w-5/12 font-bold">{nickName}</h4>
      <p
        className={`w-2/12 font-bold ${
          marketParams && marketParams.side === "0"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {price}
      </p>
      <p className="w-2/12 pl-2">{Number(lastQuantity).toFixed(0)}</p>
      <span className="w-3/12 hidden sm:flex">
        <p>{minAmount}</p>
        <p>-</p>
        <p>{maxAmount}</p>
      </span>
    </article>
  );
}
export default MobileAdRow;
