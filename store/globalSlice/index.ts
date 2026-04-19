import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store";
import {
  Ad,
  BalanceDetails,
  LoginPayload,
  MarketAd,
  OrderSides,
  User,
  UserDetails,
} from "@types";

const initialState: InitialState = {
  apploaded: false,
  apiLink: "http://localhost:5000/api",
  isLoggedIn: false,
  userDetails: {
    userId: "",
    email: "",
    credentials: "",
  },
  accessToken: "",
  balanceDetails: {
    bankBalance: "10,000,000",
    walletBalance: "",
  },
  pendingPayments: {
    count: 0,
    orders: {
      buyOrders: [],
      sellOrders: [],
    },
    side: "0",
  },
  pendingReleases: {
    count: 0,
    orders: {
      buyOrders: [],
      sellOrders: [],
    },
    side: "0",
  },
  ads: {
    lastFetch: 0,
    ads: [],
    initialFetch: false,
  },
  marketAds: {
    lastFetch: 0,
    ads: [],
    initialFetch: false,
  },
  orders: {
    fetchOrders: true,
    ordersLoading: true,
    ordersError: false,
    ordersErrorMessage: "",
  },
  dashBoardDetails: {
    userDetails: {
      nickName: "",
      recentRate: 0,
      totalFinishCount: 0,
      totalFinishSellCount: 0,
      totalFinishBuyCount: 0,
      recentFinishCount: 0,
      averageReleaseTime: "",
      averageTransferTime: "",
      accountCreateDays: 0,
      firstTradeDays: 0,
      realName: "",
      recentTradeAmount: "",
      totalTradeAmount: "",
      goodAppraiseRate: "",
      goodAppraiseCount: 0,
      badAppraiseCount: 0,
      walletBalance: "",
      transferBalance: "",
    },
    lastFetch: 0,
    initialFetch: false,
  },
  pageError: false,
  pageErrorMessage: "",
  popUpError: false,
  popUpErrorMessage: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleSiteLogin: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload.userDetails;
      state.accessToken = action.payload.accessToken;
    },

    handlePendingOrdersSide(
      state,
      action: PayloadAction<{ status: 10 | 20; side: "0" | "1" }>
    ) {
      const { status, side } = action.payload;
      if (status === 10) {
        state.pendingPayments.side = side;
      } else if (status === 20) {
        state.pendingReleases.side = side;
      }
    },

    handleAppLoaded(state) {
      state.apploaded = true;
    },
    handleGetOrders(state) {
      state.orders.ordersError = false;
      state.orders.ordersErrorMessage = "";
      state.orders.fetchOrders = true;
    },
    handleOrdersLoading(state, action: PayloadAction<boolean>) {
      state.orders.ordersLoading = action.payload;
      if (!action.payload) {
        state.orders.fetchOrders = false;
      }
    },
    handleOrdersResult(
      state,
      action: PayloadAction<{
        pendingPayments: OrderSides;
        pendingReleases: OrderSides;
        accountBalances: BalanceDetails;
      }>
    ) {
      const { pendingPayments, pendingReleases, accountBalances } =
        action.payload;

      state.pendingPayments.orders = pendingPayments;
      state.pendingPayments.count =
        pendingPayments.buyOrders.length + pendingPayments.sellOrders.length;
      state.pendingReleases.orders = pendingReleases;
      state.pendingReleases.count =
        pendingReleases.buyOrders.length + pendingReleases.sellOrders.length;
      state.orders.ordersLoading = false;
      state.balanceDetails = accountBalances;
      state.orders.fetchOrders = false;
    },
    handleOrdersError(state, action: PayloadAction<{ message: string }>) {
      state.orders.ordersError = true;
      state.orders.ordersErrorMessage = action.payload.message;
    },
    handleAds(
      state,
      action: PayloadAction<{
        lastFetch: number;
        ads: Ad[];
        initialFetch: boolean;
      }>
    ) {
      state.ads = action.payload;
    },
    handleMarketAds(
      state,
      action: PayloadAction<{
        lastFetch: number;
        ads: MarketAd[];
        initialFetch: boolean;
      }>
    ) {
      state.marketAds = action.payload;
    },
    handleDashBoardDetails(
      state,
      action: PayloadAction<{
        userDetails: UserDetails;
        lastFetch: number;
        initialFetch: boolean;
      }>
    ) {
      state.dashBoardDetails = action.payload;
    },
    handleError(
      state,
      action: PayloadAction<{ type: "PAGE" | "POPUP"; message: string }>
    ) {
      const { message, type } = action.payload;
      if (type === "PAGE") {
        state.pageError = true;
        state.pageErrorMessage = message;
      } else if (type === "POPUP") {
        state.popUpError = true;
        state.popUpErrorMessage = message;
      }
    },
    handleResetError(state, action: PayloadAction<{ type: "PAGE" | "POPUP" }>) {
      if (action.payload.type === "PAGE") {
        state.pageError = false;
        state.pageErrorMessage = "";
      } else if (action.payload.type === "POPUP") {
        state.popUpError = false;
      }
    },
  },
});

interface InitialState {
  apploaded: boolean;
  apiLink: string;
  isLoggedIn: boolean;
  userDetails: User;
  accessToken: string;
  balanceDetails: BalanceDetails;
  pendingPayments: {
    count: number;
    orders: OrderSides;
    side: "0" | "1";
  };
  pendingReleases: {
    count: number;
    orders: OrderSides;
    side: "0" | "1";
  };
  orders: {
    fetchOrders: boolean;
    ordersLoading: boolean;
    ordersError: boolean;
    ordersErrorMessage: string;
  };

  marketAds: {
    lastFetch: number;
    ads: MarketAd[];
    initialFetch: boolean;
  };
  ads: {
    lastFetch: number;
    ads: Ad[];
    initialFetch: boolean;
  };
  dashBoardDetails: {
    userDetails: UserDetails;
    lastFetch: number;
    initialFetch: boolean;
  };

  pageError: boolean;
  pageErrorMessage: string;
  popUpError: boolean;
  popUpErrorMessage: string;
}

export const {
  handleSiteLogin,
  handleAppLoaded,
  handleGetOrders,
  handleAds,
  handleMarketAds,
  handleDashBoardDetails,
  handlePendingOrdersSide,
  handleError,
  handleResetError,
  handleOrdersResult,
  handleOrdersLoading,
  handleOrdersError,
} = globalSlice.actions;
export default globalSlice.reducer;
