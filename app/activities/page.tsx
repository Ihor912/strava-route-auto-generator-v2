"use client";

import { Activity } from "@/types/Strava";
import { useActivitiesFetching } from "../hooks/useActivitiesFetching";

/**
 * Renders a list of activities fetched from the server.
 *
 * @return {JSX.Element}
 */
export default function Page() {
  const { activities } = useActivitiesFetching();

  return (
    <>
      {activities?.map((x: Activity) => (
        <li key={x.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">{x.name}</h3>
        </li>
      ))}
    </>
  );
}
