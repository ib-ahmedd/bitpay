import { MarketAd, MarketParams } from "@types";
import MobileAdRow from "./MobileAdRow";
import { sampleMarketAdsArray } from "@app/constants";

function MobileAdTable({ marketAds, marketParams }: MobileAdsTableProps) {
  return (
    <div className="w-full flex flex-col gap-1 md:hidden text-sm ">
      <div className="flex justify-between text-site-text-gray px-2">
        <p className="w-8/12 sm:w-5/12">Nickname</p>
        <p className="w-2/12">Price</p>
        <p className="w-2/12 pl-2">Qty</p>
        <p className="w-3/12 hidden sm:block">Range</p>
      </div>
      {marketAds.map((item) => (
        <MobileAdRow key={item.id} {...item} marketParams={marketParams} />
      ))}
    </div>
  );
}

interface MobileAdsTableProps {
  marketAds: MarketAd[];
  marketParams: MarketParams;
}

export default MobileAdTable;
