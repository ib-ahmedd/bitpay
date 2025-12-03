import { TradeInfoCardProps } from "@types";

function TradeInfoCard({ title, info }: TradeInfoCardProps) {
  return (
    <div className="flex w-full justify-between mt-2 bg-site-transparent-blue py-4 px-6 box-border rounded-full shadow-lg">
      <h4 className="font-bold">{title}:</h4>
      <p className="text-site-orange">{info}</p>
    </div>
  );
}

export default TradeInfoCard;
