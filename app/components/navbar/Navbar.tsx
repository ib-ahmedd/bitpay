"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faCog,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { navLinksArray } from "../../constants";
import { useState } from "react";
function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <nav className="sticky z-10 -top-20 transition duration-300 bg-navbar-dark flex justify-between items-center w-full py-2 px-8 border border-border-grey mx-auto mt-8 rounded-full shadow-x">
        <a
          href="/dashboard"
          className="font-bold text-lg md:text-xl xl:text-2xl"
        >
          DayarNG
        </a>
        <div className=" hidden md:flex gap-4 lg:gap-8">
          {navLinksArray.map((item) => (
            <a
              className="font-semibold text-sm lg:text-base hover:text-site-orange"
              href={item.href}
              key={item.title}
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="flex justify-between gap-2 items-center font-bold md:hidden">
          <p className="border-r pr-2 border-white">$10</p>
          <p>N1,700,200</p>
        </div>

        <div className="flex  items-center gap-3 text-sm relative">
          <a>
            <FontAwesomeIcon icon={faCog} />
          </a>

          <button
            className="block md:hidden relative"
            onClick={() => {
              setNavOpen(true);
            }}
          >
            <span className="absolute bg-site-orange w-6 h-6 rounded-full text-white -top-3 -right-5 font-bold border border-white">
              3
            </span>
            <FontAwesomeIcon icon={faBars} className="text-lg" />
          </button>
        </div>
      </nav>

      <div
        className={`bg-body-dark fixed p-8 rounded-s-[3em] block md:hidden top-0 w-9/12 sm:w-96 right-0 h-screen z-20 transition duration-200 shadow-2xl ${
          navOpen ? " translate-x-0" : "translate-x-[105%]"
        }`}
      >
        <button
          className="text-2xl text-site-text-gray mb-8"
          onClick={() => {
            setNavOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className="flex flex-col gap-4">
          {navLinksArray.map((item) => (
            <a
              className="font-semibold py-2 border-b"
              key={item.title}
              onClick={() => {
                setNavOpen(false);
              }}
            >
              {" "}
              {item.title}
            </a>
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

export default Navbar;
