import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { SetStateAction, Dispatch } from "react";

export interface UserDetails {
  nickName: string;
  recentRate: number;
  totalFinishCount: number;
  totalFinishSellCount: number;
  totalFinishBuyCount: number;
  recentFinishCount: number;
  averageReleaseTime: string;
  averageTransferTime: string;
  accountCreateDays: number;
  firstTradeDays: number;
  realName: string;
  recentTradeAmount: string;
  totalTradeAmount: string;
  goodAppraiseRate: string;
  goodAppraiseCount: number;
  badAppraiseCount: number;
  walletBalance: string;
  transferBalance: string;
}

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
  amount: string;
}

export interface TradeInfoCardProps {
  title: string;
  info: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface PageDetails {
  page: string;
  status: 10 | 20;
  orders: OrderSides;
  count: number;
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

export interface BalanceDetails {
  bankBalance: string;
  walletBalance: string;
}

export interface HandleLoginPayload {
  accessToken: string;
  userCredentials: string;
  balanceDetails: BalanceDetails;
}

export interface PendingPaymentOrderCardProps {
  userName: string;
  amount: string;
  userId: string;
  orderId: string;
}

export interface OrderSides {
  buyOrders: Order[];
  sellOrders: Order[];
}

export interface PendingOrdersFetchData {
  accountBalances: BalanceDetails;
  pendingPayments: OrderSides;
  pendingReleases: OrderSides;
}

export interface User {
  userId: string;
  email: string;
  credentials: string;
}

export interface LoginPayload {
  userDetails: User;
  accessToken: string;
}

export interface Order {
  orderId: string;
  userId: string;
  status: number;
  side: number;
  amount: string;
  counterPartyName: string;
  price: string;
  unreadMessages: string;
  createDate: string;
  paymentType?: string;
  paymentId?: string;
  accountNo?: string;
  bankName?: string;
  targetUserId?: string;
  expandedOrder?: string;
  setExpandedOrder?: Dispatch<SetStateAction<string>>;
  setGetData?: Dispatch<SetStateAction<boolean>>;
  handleOpenChat?: (userName: string, orderId: string) => void;
}

export interface Filters {
  type: "none" | "sell" | "buy";
  status:
    | "none"
    | "completed"
    | "canceled"
    | "pending payment"
    | "pending release";
}

export interface MessageType {
  id: string;
  message: string;
  userId: string;
}

export interface Ad {
  id: string;
  side: number;
  price: string;
  lastQuantity: string;
  quantity: string;
  minAmount: string;
  maxAmount: string;
  status: 10 | 20 | 30;
  isOnline: boolean;
  handleOpenAd?: (adId: string, side: number, status: 10 | 20 | 30) => void;
  handleRemoveAd?: (adId: string) => void;
}

export interface TradingPreference {
  hasUnPostAd?: 0 | 1;
  isKyc?: 0 | 1;
  isEmail?: 0 | 1;
  isMobile?: 0 | 1;
  hasRegisterTime?: 0 | 1;
  registerTimeThreshold?: number;
  orderFinishNumberDay30?: number;
  completeRateDay30?: string;
  nationalLimit?: string;
  hasOrderFinishNumberDay30?: 0 | 1;
  hasCompleteRateDay30?: 0 | 1;
  hasNationalLimit?: 0 | 1;
}

export interface AdDetails {
  id: string;
  userId: string;
  side: number;
  price: string;
  lastQuantity: string;
  minAmount: string;
  maxAmount: string;
  remark: string;
  status: number;
  isOnline: boolean;
  tradingPreferenceSet: TradingPreference;
  priceType: "0" | "1";
  premium: string;
  paymentIds: string[];
  actionType: "MODIFY" | "ACTIVE";
  quantity: string;
  paymentPeriod: string;
}

export interface MarketAd {
  id: string;
  nickName: string;
  side: string;
  price: string;
  lastQuantity: string;
  quantity: string;
  minAmount: string;
  maxAmount: string;
  marketParams?: MarketParams;
}

export interface MarketParams {
  side: string;
  limit: string;
}

export interface MarketParamsProps {
  marketParams: MarketParams;
  setMarketParams: Dispatch<SetStateAction<MarketParams>>;
  setFetch: Dispatch<SetStateAction<boolean>>;
}
