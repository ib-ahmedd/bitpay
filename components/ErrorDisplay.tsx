import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "@store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ErrorDisplay({ func }: ErrorDisplayProps) {
  const { pageErrorMessage, orders } = useSelector(
    (state: RootState) => state.global
  );

  const [displayedErrorMessage, setDisplayedErrorMessage] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("pending")) {
      setDisplayedErrorMessage(pageErrorMessage);
    } else {
      setDisplayedErrorMessage(orders.ordersErrorMessage);
    }
  }, [pathname]);
  return (
    <section className="w-full h-[60vh] flex flex-col items-center justify-center">
      <article
        className="flex flex-col gap-2
       items-center border-2 border-red-500 rounded-3xl w-full sm:w-[23em] py-4 justify-center bg-site-transparent-red"
      >
        <span className="text-3xl md:text-5xl text-red-500">
          <FontAwesomeIcon icon={faWarning as IconDefinition} />
        </span>
        <p className="text-xl md:text-2xl">{displayedErrorMessage}</p>
        <button
          className="bg-site-orange py-2 px-6 rounded-full text-sm md:text-base"
          onClick={() => {
            func();
          }}
        >
          Retry
        </button>
      </article>
    </section>
  );
}

interface ErrorDisplayProps {
  func: () => void;
}

export default ErrorDisplay;
