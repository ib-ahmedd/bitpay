import { TradeInfoCardProps } from "@types";

function TradeInfoCard({ title, info }: TradeInfoCardProps) {
  return (
    <div className="flex w-full justify-between mt-2 bg-site-transparent-blue py-2 lg:py-4 px-6 box-border rounded-full shadow-lg">
      <h4 className="font-bold text-sm lg:text-base">{title}:</h4>
      <p className="text-site-orange text-sm lg:text-bas">{info}</p>
    </div>
  );
}

export default TradeInfoCard;
