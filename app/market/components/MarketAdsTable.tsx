import { sampleMarketAdsArray } from "@app/constants";
import { MarketAd, MarketParams } from "@types";
import TableRow from "./TableRow";

function MarketAdsTable({ marketAds, marketParams }: MarketAdsTableProps) {
  return (
    <table className="hidden md:table w-full border-collapse bg-site-lighter-grey border border-border-grey p-4 mb-4">
      <thead className="border border-border-grey">
        <tr>
          <th className="p-2 text-site-text-gray">Nickname</th>
          <th className="text-site-text-gray">Price</th>
          <th className="text-site-text-gray">Quantity</th>
          <th className="text-site-text-gray">Price Range</th>
        </tr>
      </thead>
      <tbody>
        {marketAds.map((item) => (
          <TableRow key={item.id} {...item} marketParams={marketParams} />
        ))}
      </tbody>
    </table>
  );
}

interface MarketAdsTableProps {
  marketAds: MarketAd[];
  marketParams: MarketParams;
}

export default MarketAdsTable;
