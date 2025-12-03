"use client";

import AccountInfoContainer from "./components/accountInfoContainer";
import TradeInfoContainer from "./components/tradeInfoContainer";

function Hero() {
  return (
    <section className="w-full h-[80vh] rounded-3xl mt-5 border-border-grey box-border">
      <div className="flex h-full flex-col">
        <h2 className="text-2xl font-bold gap-4 p-4 bg-navbar-dark border border-border-grey rounded-full my-4 text-center">
          Dashboard
        </h2>
        <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
          <AccountInfoContainer />
          <TradeInfoContainer />
        </div>
      </div>
    </section>
  );
}

export default Hero;
