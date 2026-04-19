import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Pending Order",
  description: "see pending orders",
};

function PendingLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

export default PendingLayout;
