import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Ads",
  description: "Ads",
};

function AdsLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

export default AdsLayout;
