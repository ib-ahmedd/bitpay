import { tradeInfoArray } from "@app/constants";
import TradeInfoCard from "./TradeInfoCard";

function TradeInfoContainer() {
  return (
    <div className="w-full lg:w-[49%] bg-[#222] shadow-2xl rounded-3xl border border-border-grey box-border p-2 lg:p-4 flex items-center flex-col">
      <h3 className="text-lg lg:text-xl font-bold">Trade Info</h3>
      <div className="w-full flex flex-wrap justify-between">
        {tradeInfoArray.map((item) => (
          <TradeInfoCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

export default TradeInfoContainer;
