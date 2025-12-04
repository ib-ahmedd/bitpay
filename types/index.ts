import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { SetStateAction, Dispatch } from "react";

export interface BalanceCardProps {
  icon: IconDefinition;
  title: string;
  currency: string;
  balance: number;
}

export interface InfoContainerProps {
  heading: string;
}

export interface AccountsInfoCardProps {
  title: string;
  currencySymbol: string;
  amount: number;
}

export interface TradeInfoCardProps {
  title: string;
  info: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface PageTitleBarProps {
  children?: React.ReactNode;
  page: string;
}
