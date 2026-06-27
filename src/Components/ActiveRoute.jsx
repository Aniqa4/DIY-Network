'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

function ActiveRoute({ to, children }) {
  const pathname = usePathname();
  const isActive = to === "/" ? pathname === "/" : pathname === to;

  return (
    <Link
      href={to}
      scroll={false}
      className={
        isActive
          ? "px-4 py-1.5 text-sm font-semibold bg-ink text-canvas-light rounded-sm"
          : "px-4 py-1.5 text-sm font-medium text-ink/55 border border-canvas-dark rounded-sm hover:border-ink hover:text-ink transition-colors duration-200"
      }
    >
      {children}
    </Link>
  );
}

export default ActiveRoute;
