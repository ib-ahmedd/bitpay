"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BalanceCardProps } from "@types";

function BalanceCard({ icon, title, currency, balance }: BalanceCardProps) {
  return (
    <article className="w-[30%] flex border border-navbar-light-b dark:border-border-grey h-full px-4 py-8 rounded-3xl bg bg-site-transparent-orange justify-between items-center">
      <div className="flex flex-col gap-2 justify-between">
        <h2 className="text-xl">{title}</h2>
        <p className="font-bold text-3xl">
          {currency}
          {balance}
        </p>
      </div>
      <span className="text-4xl ">
        <FontAwesomeIcon icon={icon} width={"50px"} />
      </span>
    </article>
  );
}

export default BalanceCard;
