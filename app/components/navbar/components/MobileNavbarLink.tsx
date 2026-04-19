import { RootState } from "@store";
import Link from "next/link";
import { useSelector } from "react-redux";
import PendingOrdersCount from "./PendingOrdersCount";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

function MobileNavbarLink({ title, href, setNavOpen }: MobileNavbarLinkProps) {
  const { pendingPayments, pendingReleases } = useSelector(
    (state: RootState) => state.global
  );

  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`font-semibold py-2 border-b ${
        pathname === href && "text-site-orange border-site-orange"
      }`}
      onClick={() => {
        setNavOpen(false);
      }}
    >
      <span className="flex">
        {title}
        {title === "Pending Payments" && (
          <PendingOrdersCount count={pendingPayments.count} />
        )}
        {title === "Pending Releases" && (
          <PendingOrdersCount count={pendingReleases.count} />
        )}
      </span>
    </Link>
  );
}

interface MobileNavbarLinkProps {
  title: string;
  href: string;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
}
export default MobileNavbarLink;
