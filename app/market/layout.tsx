import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Market Ads",
  description: "see market ads",
};

function MarketLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

export default MarketLayout;
