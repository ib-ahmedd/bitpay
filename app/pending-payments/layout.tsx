import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Pending Payments",
  description: "Pay unpaid active orders",
};

function PendingPaymentsLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

export default PendingPaymentsLayout;
