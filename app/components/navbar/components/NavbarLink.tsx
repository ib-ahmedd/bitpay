import { RootState } from "@store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import PendingOrdersCount from "./PendingOrdersCount";

function NavbarLink({ title, href }: NavbarLinkProps) {
  const { pendingPayments, pendingReleases } = useSelector(
    (state: RootState) => state.global
  );

  // console.log(pendingPayments, pendingReleases);
  const pathname = usePathname();
  return (
    <Link
      className={`font-semibold text-sm lg:text-base hover:text-site-orange-hover ${
        pathname === href && "text-site-orange"
      }`}
      href={href}
      key={title}
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

interface NavbarLinkProps {
  title: string;
  href: string;
}

export default NavbarLink;
