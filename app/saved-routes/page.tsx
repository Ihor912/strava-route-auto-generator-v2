"use client";

import { Activity } from "@/types/Strava";
import { useSavedRoutesFetching } from "../hooks/useSavedRoutesFetching";

/**
 * Renders a list of saved routes.
 *
 * @return {JSX.Element}
 */
export default function Page() {
  const { routes } = useSavedRoutesFetching();

  return (
    <>
      {routes?.map((x: Activity) => (
        <li key={x.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">{x.name}</h3>
        </li>
      ))}
    </>
  );
}
