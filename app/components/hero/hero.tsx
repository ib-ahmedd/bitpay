"use client";

import AccountInfoContainer from "./components/AccountInfoContainer";
import TradeInfoContainer from "./components/TradeInfoContainer";

function Hero() {
  return (
    <section className="w-full h-[80vh] rounded-3xl xl:mt-5 border-border-grey box-border">
      <div className="flex h-full flex-col">
        <div className="w-full flex flex-col gap-2 xl:gap-4 lg:flex-row justify-between">
          <AccountInfoContainer />
          <TradeInfoContainer />
        </div>
      </div>
    </section>
  );
}

export default Hero;
