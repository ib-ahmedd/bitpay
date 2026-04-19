function LoadingSetLimit({ value, side }: LoadingSetLimitProps) {
  return (
    <div className="w-full  flex justify-between items-center gap-2 mb-2 text-border-grey text-sm md:text-base">
      <div className="flex items-center w-[9em] md:w-1/3">
        <p className="hidden md:block mr-2">Limit: </p>
        <input
          disabled
          className="w-[65%] md:w-[10em] bg-site-dark-grey outline-none border border-border-grey py-1 px-4 rounded-l-full"
          type="text"
          value={value}
        />
        <button
          disabled
          className="w-[35%] md:w-fit border border-border-grey bg-border-grey text-site-text-gray py-1 md:px-3 rounded-r-full"
        >
          Reset
        </button>
      </div>

      <div className="md:w-1/3 flex flex-1 justify-center gap-1 md:gap-2 text-sm md:text-base">
        <button
          disabled
          className={`border-2 border-border-grey w-[4em] md:w-[6em] py-1 md:py-2 font-bold rounded-full ${
            side === "0" && "bg-border-grey text-site-text-gray"
          }`}
        >
          BUY
        </button>
        <button
          disabled
          className={`border-2 border-border-grey w-[4em] md:w-[6em] py-1 md:py-2 font-bold rounded-full ${
            side === "1" && "bg-border-grey text-site-text-gray"
          }`}
        >
          SELL
        </button>
      </div>

      <div className="md:w-1/3 flex justify-end">
        <button
          disabled
          className="w-[5em] md:w-[7em] text-sm md:text-base py-1 md:py-2 border-2 border-border-grey text-center font-bold rounded-full"
        >
          Reload
        </button>
      </div>
    </div>
  );
}
interface LoadingSetLimitProps {
  value: string;
  side: string;
}
export default LoadingSetLimit;
