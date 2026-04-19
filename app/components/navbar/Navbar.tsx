"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBars, faClose, faCog } from "@fortawesome/free-solid-svg-icons";
import { navLinksArray } from "../../constants";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavbarLink from "./components/NavbarLink";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import MobileNavbarLink from "./components/MobileNavbarLink";
function Navbar() {
  const { balanceDetails, pendingPayments } = useSelector(
    (state: RootState) => state.global
  );
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  if (pathname === "/auth") {
    return <></>;
  } else {
    return (
      <>
        <nav className="sticky z-10 -top-20 transition duration-300 bg-site-lighter-grey flex justify-between items-center w-full py-2 px-4 xl:px-8 border border-border-grey mx-auto my-4 xl:mt-8 rounded-full shadow-x">
          <Link href="/" className="font-bold text-lg md:text-xl xl:text-2xl">
            BITPAY
          </Link>
          <div className=" hidden md:flex gap-4 lg:gap-8">
            {navLinksArray.map((item) => (
              <NavbarLink key={item.title} {...item} />
            ))}
          </div>

          <div className="flex justify-between gap-2 items-center font-bold md:hidden text-sm">
            <p className="border-r pr-2 border-white">
              ${Number(balanceDetails.walletBalance).toFixed(2)}
            </p>
            <p>N{balanceDetails.bankBalance}</p>
          </div>

          <div className="flex  items-center gap-3 text-sm relative">
            <Link href="/">
              <FontAwesomeIcon icon={faCog as IconProp} />
            </Link>

            <button
              className="block md:hidden relative"
              onClick={() => {
                setNavOpen(true);
              }}
            >
              {pendingPayments.count > 0 && (
                <span className="absolute bg-site-orange w-6 h-6 rounded-full text-white -top-3 -right-3 font-bold border border-white">
                  {pendingPayments.count}
                </span>
              )}
              <FontAwesomeIcon icon={faBars as IconProp} className="text-lg" />
            </button>
          </div>
        </nav>

        <div
          className={`bg-site-lighter-grey fixed p-8 rounded-s-[3em] block md:hidden top-0 w-9/12 sm:w-96 right-0 h-screen z-20 transition duration-200 shadow-2xl ${
            navOpen ? " translate-x-0" : "translate-x-[105%]"
          }`}
        >
          <button
            className="text-2xl text-site-text-gray mb-8"
            onClick={() => {
              setNavOpen(false);
            }}
          >
            <FontAwesomeIcon icon={faClose as IconProp} />
          </button>
          <div className="flex flex-col gap-4">
            {navLinksArray.map((item) => (
              <MobileNavbarLink
                key={item.title}
                {...item}
                setNavOpen={setNavOpen}
              />
            ))}
          </div>
        </div>
        <div
          className={`fixed w-full bg-black h-screen top-0 left-0 z-10 opacity-70  ${
            navOpen ? "block" : "hidden"
          }`}
          onClick={() => {
            setNavOpen(false);
          }}
        ></div>
      </>
    );
  }
}

export default Navbar;
