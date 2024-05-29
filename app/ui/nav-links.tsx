"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Renders the navigation links bar component.
 *
 * @return {JSX.Element} component.
 */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-800 p-4 flex flex-col sm:flex-row justify-around">
      <Link
        className={`link text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium text-center ${
          pathname === "/" ? "bg-gray-600" : ""
        }`}
        href="/"
      >
        Heatmap
      </Link>

      <Link
        className={`link text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium text-center ${
          pathname === "/activities" ? "bg-gray-600" : ""
        }`}
        href="/activities"
      >
        Activities
      </Link>
      <Link
        className={`link text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium text-center ${
          pathname === "/saved-routes" ? "bg-gray-600" : ""
        }`}
        href="/saved-routes"
      >
        Saved Routes
      </Link>
    </nav>
  );
}
