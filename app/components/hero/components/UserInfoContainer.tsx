import TradeInfoCard from "./UserInfoCard";
import { UserDetails } from "@types";

function UserInfoContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:w-1/2 bg-[#222] shadow-2xl rounded-3xl border border-border-grey box-border p-2 lg:p-4 flex items-center flex-col">
      <h3 className="text-lg lg:text-xl font-bold">{title}</h3>
      <div className="w-full flex flex-wrap justify-between">{children}</div>
    </div>
  );
}

export default UserInfoContainer;
