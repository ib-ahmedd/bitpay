import AccountsInfoCard from "./AccountsInfoCard";
import { accountsInfoArray } from "@app/constants";

function AccountInfoContainer() {
  return (
    <div className="w-full lg:w-[49%] bg-[#222] shadow-2xl rounded-3xl border border-border-grey box-border p-2 lg:p-4 flex items-center flex-col">
      <h3 className="text-lg lg:text-xl font-bold">Accounts Info</h3>
      <div className="w-full flex flex-wrap justify-between">
        {accountsInfoArray.map((item) => (
          <AccountsInfoCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

export default AccountInfoContainer;
