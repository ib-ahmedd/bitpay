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

export interface AuthInputProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface AuthSubmitBtnProps {
  text: string;
}

export interface LoginSignUpSwitchBarProps {
  onScreen: string;
  setOnScreen: Dispatch<SetStateAction<string>>;
}

export interface AuthUserDetails {
  email: string;
  password: string;
  confPassword: string;
  api_key: string;
  api_secret: string;
}

export type AuthModalOptions =
  | "login"
  | "signup"
  | "otp"
  | "complete"
  | "reset-password"
  | "forgot-password"
  | "forgot-otp"
  | "reset-otp";

export interface AuthModalsProps {}

export interface AuthFormContainerProps {
  children: React.ReactNode;
  errorMessage?: string | undefined;
  handleModalPosition: () => void;
  handleSubmit: () => void;
}

export interface AuthPageContextValue {
  onScreen: string;
  setOnScreen: Dispatch<SetStateAction<AuthModalOptions>>;
  userDetails: AuthUserDetails;
  handleUserDetails: (event: any) => void;
  authAccessToken: string;
  setAuthToken: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setAuthAccessToken: Dispatch<SetStateAction<string>>;
  loading: string;
  setLoading: Dispatch<SetStateAction<string>>;
}
