"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useActivitiesFetching } from "./hooks/useActivitiesFetching";
import { useSavedRoutesFetching } from "./hooks/useSavedRoutesFetching";
import { LoadingSpinner } from "./ui/loading-spinner";

const LazyMap = dynamic(() => import("@/app/ui/map"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

/**
 * Renders the Home component which displays a map of user's activities and saved routes.
 *
 * @return {JSX.Element} component.
 */
export default function Home() {
  const { activities, activitiesLoading } = useActivitiesFetching();
  const { routes, routesLoading, currentUserLoading } =
    useSavedRoutesFetching();
  const [currentLocation, setCurrentLocation] = useState<[number, number] | []>(
    [],
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    }
  }, []);

  return (
    <main>
      {currentLocation?.length !== 2 ||
      activitiesLoading ||
      currentUserLoading ||
      routesLoading ? (
        <LoadingSpinner />
      ) : (
        <LazyMap
          activities={activities}
          routes={routes}
          location={currentLocation}
        />
      )}
    </main>
  );
}
