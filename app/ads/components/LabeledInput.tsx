import { RootState } from "@store";
import { useSelector } from "react-redux";

function LabeledInput({
  label,
  name,
  value,
  handleChange,
  currency,
  style,
  setMaxQuantity,
}: LabeledInputProps) {
  const { balanceDetails } = useSelector((state: RootState) => state.global);
  return (
    <div className="w-full flex flex-col">
      <label className="ml-4 text-sm md:text-base">{label}</label>
      {style === 1 && (
        <span className="flex h-[2em] md:h-[2.5em]">
          <p className=" border border-border-grey p-2 text-sm font-bold rounded-l-full bg-site-dark-grey flex items-center text-site-orange">
            {currency}
          </p>
          <input
            name={name}
            className="flex-1 bg-site-dark-grey border border-border-grey outline-none px-2 rounded-r-full"
            type="text"
            value={value}
            onChange={handleChange}
          />
        </span>
      )}
      {style === 3 && (
        <span className="flex h-[2em] md:h-[2.5em]">
          <p className=" border border-border-grey p-2 text-sm font-bold rounded-l-full bg-site-dark-grey flex items-center text-site-orange">
            {currency}
          </p>
          <input
            name={name}
            className="flex-1 bg-site-dark-grey border border-border-grey outline-none px-2"
            type="text"
            value={value}
            onChange={handleChange}
          />
          <button
            className=" border border-border-grey py-2 px-3 font-bold rounded-r-full bg-site-orange hover:bg-site-orange-hover text-sm md:text-base flex items-center"
            onClick={setMaxQuantity}
          >
            Max
          </button>
        </span>
      )}
      {style === 2 && (
        <input
          className="w-full bg-site-dark-grey rounded-full outline-none box-border py-1 md:py-2 px-4 border border-border-grey"
          type="text"
          name={name}
          onChange={handleChange}
          value={value}
        />
      )}
    </div>
  );
}

interface LabeledInputProps {
  label: string;
  name: string;
  value: string;
  handleChange: (e: any) => void;
  currency: string;
  style: 1 | 2 | 3;
  setMaxQuantity?: () => void;
}
export default LabeledInput;
