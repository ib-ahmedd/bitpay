import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretUp,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterRadioBtn from "./FilterRadioBtn";
import { Dispatch, SetStateAction, useContext } from "react";
import { OrdersPageContext } from "./OrderPageContext";
import { Filters } from "@types";

function FilterModal({ filtersOpen, setFiltersOpen }: FilterModalProps) {
  const { resetFilters, applyFilters } = useContext(OrdersPageContext);
  return (
    <article className="w-52 relative border border-border-grey bg-site-lighter-grey text-sm">
      <button
        className="w-full hover:bg-border-grey flex items-center justify-center gap-2 py-2"
        onClick={() => {
          setFiltersOpen((prev) => !prev);
        }}
      >
        <p>Filter</p>
        <FontAwesomeIcon
          icon={
            filtersOpen
              ? (faCaretUp as IconDefinition)
              : (faCaretDown as IconDefinition)
          }
        />
      </button>
      {filtersOpen && (
        <div className="w-full border border-border-grey shadow-2xl absolute bg-site-lighter-grey">
          <div className="w-full flex">
            <button
              className="w-full py-2 border-b border-l border-border-grey hover:bg-border-grey"
              onClick={() => {
                resetFilters();
              }}
            >
              Reset
            </button>
          </div>
          <div className="w-full border-b border-border-grey">
            <FilterRadioBtn text="Sell" />
            <FilterRadioBtn text="Buy" />
          </div>
          <div className="w-full border-b border-border-grey">
            <FilterRadioBtn text="Completed" />
            <FilterRadioBtn text="Canceled" />
            <FilterRadioBtn text="Pending Payment" />
            <FilterRadioBtn text="Pending Release" />
          </div>
          <button
            className="w-full bg-site-orange py-2"
            onClick={() => {
              setFiltersOpen(false);
              applyFilters();
            }}
          >
            Apply
          </button>
        </div>
      )}
    </article>
  );
}

interface FilterModalProps {
  filtersOpen: boolean;
  setFiltersOpen: Dispatch<SetStateAction<boolean>>;
}
export default FilterModal;
