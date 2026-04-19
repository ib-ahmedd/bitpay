import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Orders History",
  description: "see completed orders history",
};

function OrdersHistoryLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

export default OrdersHistoryLayout;
