import { MarketAd } from "@types";

function TableRow({
  nickName,
  lastQuantity,
  price,
  minAmount,
  maxAmount,
  marketParams,
}: MarketAd) {
  return (
    <tr className="">
      <td className="text-center border border-border-grey font-bold p-1">
        {nickName}
      </td>
      <td
        className={`text-center border border-border-grey font-bold ${
          marketParams && marketParams.side === "0"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {price}
      </td>
      <td className="text-center border border-border-grey">{lastQuantity}</td>
      <td className="text-center border border-border-grey">
        {minAmount} - {maxAmount}
      </td>
    </tr>
  );
}
export default TableRow;
