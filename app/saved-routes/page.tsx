"use client";

import { Activity } from "@/types/Strava";
import { useEffect, useState } from "react";
import { useSavedRoutesFetching } from "../hooks/useSavedRoutesFetching";
import { LoadingSpinner } from "../ui/loading-spinner";

/**
 * Renders a list of saved routes.
 *
 * @return {JSX.Element}
 */
export default function Page() {
  const { routes, routesLoading, currentUserLoading } =
    useSavedRoutesFetching();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(routesLoading || currentUserLoading);
  }, [routesLoading, currentUserLoading]);

  if (isLoading) return <LoadingSpinner />;

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
