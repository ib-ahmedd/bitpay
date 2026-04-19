import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InModalErroDisplay({ message, func }: InModalErroDisplayProps) {
  return (
    <article className="h-[75vh] w-full flex items-center justify-center">
      <div className="w-[85%] md:w-[70%] flex flex-col items-center justify-center gap-1 border-2 border-red-500 bg-site-transparent-red py-6 rounded-3xl">
        <span className="text-2xl text-red-500 gap-2">
          <FontAwesomeIcon icon={faWarning as IconDefinition} />
        </span>
        <p className="text-base md:text-lg">{message}</p>
        <button
          className="bg-site-orange rounded-full px-6 py-1"
          onClick={func}
        >
          Retry
        </button>
      </div>
    </article>
  );
}

interface InModalErroDisplayProps {
  message: string;
  func: () => void;
}
export default InModalErroDisplay;
