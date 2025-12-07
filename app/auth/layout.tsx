import { LayoutProps } from "@types";
import React from "react";

export const metadata = {
  title: "Authentication",
  description: "Sign up or log in",
};

function AuthLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

export default AuthLayout;
