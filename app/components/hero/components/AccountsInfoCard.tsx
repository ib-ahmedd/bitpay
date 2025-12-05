import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccountsInfoCardProps } from "@types";
import { addCommasToAmounts } from "@utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
function AccountsInfoCard({
  title,
  amount,
  currencySymbol,
}: AccountsInfoCardProps) {
  return (
    <div className="w-full box-border  flex justify-between items-center px-4 py-2 mt-2 dark:border-border-grey rounded-3xl bg-gradient-to-r from-site-transparent-orange to-site-transparent-blue shadow-md">
      <div className="">
        <h4 className="text-base xl:text-xl">{title}:</h4>
        <p className="text-xl xl:text-3xl font-bold">
          {currencySymbol}
          {addCommasToAmounts(amount)}
        </p>
      </div>
      <span className="w-8 h-8 xl:w-10 xl:h-10 bg-site-orange flex justify-center items-center rounded-full text-lg xl:text-2xl">
        <FontAwesomeIcon icon={faDollarSign as IconProp} />
      </span>
    </div>
  );
}

export default AccountsInfoCard;
