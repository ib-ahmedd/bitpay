function PageSwitchBtn({
  title,
  activePage,
  handleActivePage,
}: PageSwitchBtnProps) {
  return (
    <button
      className={`w-1/2 border border-border-grey p-2 rounded-full hover:bg-border-grey ${
        activePage === title && "bg-border-grey"
      }`}
      onClick={() => {
        handleActivePage(title);
      }}
    >
      {title}
    </button>
  );
}

interface PageSwitchBtnProps {
  title: "Market" | "My Ads";
  activePage: "Market" | "My Ads";
  handleActivePage: (title: "Market" | "My Ads") => void;
}
export default PageSwitchBtn;
