"use client";

import { useSavedRoutesFetching } from "@/app/hooks/useSavedRoutesFetching";
import { LoadingSpinner } from "@/app/ui/loading-spinner";
import { useEffect, useState } from "react";

/**
 * Renders the Page component with the saved route details based on the provided id.
 *
 * @param {number} params.id - The id of the saved route.
 * @return {JSX.Element}
 */
export default function Page({ params }: { params: { id: number } }) {
  const { routes, routesLoading } = useSavedRoutesFetching();
  const route = routes.find((x) => x.id === Number(params.id));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(routesLoading);
  }, [routesLoading]);

  if (isLoading) return <LoadingSpinner />;

  return <>{route && <h1>My Saved Route {route.name}</h1>}</>;
}
