"use client";

import { useActivitiesFetching } from "@/app/hooks/useActivitiesFetching";
import { LoadingSpinner } from "@/app/ui/loading-spinner";
import { Activity } from "@/types/Strava";
import { useEffect, useState } from "react";

/**
 * Renders the Page component with the activity details based on the provided id.
 *
 * @param {number} params.id - The id of the activity.
 * @return {JSX.Element} The JSX element representing the activity name.
 */
export default function Page({ params }: { params: { id: number } }) {
  const { activities, activitiesLoading } = useActivitiesFetching();
  const activity = activities.find((x: Activity) => x.id === Number(params.id));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(activitiesLoading);
  }, [activitiesLoading]);

  if (isLoading) return <LoadingSpinner />;

  return <>{activity && <h1>My Activity {activity.name}</h1>}</>;
}
