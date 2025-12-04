import { PageTitleBarProps } from "@types";

function PageTitleBar({ children, page }: PageTitleBarProps) {
  return (
    <div
      className="flex items-center justify-between mb-2
   xl:mb-4 font-bold px-4 lg:px-8"
    >
      <h2 className="text-base xl:text-xl w-1/2 md:w-1/3">{page}</h2>
      <div className="hidden w-1/3 md:flex gap-2 py-2 px-8 justify-center bg-site-lighter-grey border border-border-grey rounded-full font-bold">
        <p>$456.56</p>
        <p>|</p>
        <p>N1,340,234</p>
      </div>
      <div className="w-1/2 md:w-1/3 flex justify-end">
        {children && children}
      </div>
    </div>
  );
}

export default PageTitleBar;
