import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterModal from "./FilterModal";
import { useState } from "react";

function FilterCountBar({
  pageNumber,
  itemsCount,
  count,
}: FilterCountBarProps) {
  const startNo = (pageNumber - 1) * itemsCount + 1;
  const endNo = pageNumber * itemsCount;

  const [filtersOpen, setFiltersOpen] = useState(false);
  return (
    <article className="flex justify-between items-center gap-4 p-4">
      <p className="text-site-text-gray">
        Showing {startNo}-{endNo} of {count} results.
      </p>
      <FilterModal filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen} />
    </article>
  );
}

interface FilterCountBarProps {
  pageNumber: number;
  itemsCount: number;
  count: number;
}
export default FilterCountBar;
