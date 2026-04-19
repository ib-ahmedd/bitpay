import { useContext } from "react";
import { OrdersPageContext } from "./OrderPageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

function FilterRadioBtn({ text }: { text: string }) {
  const { filters, handleFilters } = useContext(OrdersPageContext);
  return (
    <button
      className="w-full py-2 px-2 flex justify-between items-center hover:bg-border-grey"
      onClick={() => {
        handleFilters(text.toLocaleLowerCase());
      }}
    >
      <p>{text}</p>{" "}
      <div className="w-5 h-5 border border-border-grey bg-site-dark-grey flex items-center justify-center text-sm">
        {filters.type === text.toLocaleLowerCase() && (
          <FontAwesomeIcon icon={faCheck as IconDefinition} />
        )}
        {filters.status === text.toLocaleLowerCase() && (
          <FontAwesomeIcon icon={faCheck as IconDefinition} />
        )}
      </div>
    </button>
  );
}

export default FilterRadioBtn;
