import { MarketParamsProps } from "@types";

function BuySellBtns({
  marketParams,
  setMarketParams,
  setFetch,
}: MarketParamsProps) {
  function handleSide(side: string) {
    setMarketParams((prev) => {
      return { ...prev, side: side };
    });
    setFetch(true);
  }
  return (
    <div className="md:w-1/3 flex flex-1 justify-center gap-1 md:gap-2 text-sm md:text-base">
      <button
        className={`border-2 border-green-500 w-[4em] md:w-[6em] py-1 md:py-2 ${
          marketParams.side === "0"
            ? "bg-green-500 text-white"
            : "text-green-500 hover:text-white hover:bg-green-500"
        } font-bold rounded-full`}
        onClick={() => {
          handleSide("0");
        }}
      >
        BUY
      </button>
      <button
        className={`border-2 border-red-500 w-[4em] md:w-[6em] py-1 md:py-2 font-bold rounded-full hover:cursor-pointer ${
          marketParams.side === "1"
            ? "bg-red-500 text-white"
            : "text-red-500 hover:text-white hover:bg-red-500"
        }`}
        onClick={() => {
          handleSide("1");
        }}
      >
        SELL
      </button>
    </div>
  );
}

export default BuySellBtns;
