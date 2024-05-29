"use client";

import { useActivitiesFetching } from "@/app/hooks/useActivitiesFetching";
import { Activity } from "@/types/Strava";

/**
 * Renders the Page component with the activity details based on the provided id.
 *
 * @param {number} params.id - The id of the activity.
 * @return {JSX.Element} The JSX element representing the activity name.
 */
export default function Page({ params }: { params: { id: number } }) {
  const { activities } = useActivitiesFetching();
  const activity = activities.find((x: Activity) => x.id === Number(params.id));

  return <h1>My Activity {activity?.name}</h1>;
}
