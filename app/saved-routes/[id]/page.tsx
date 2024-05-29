"use client";

import { useSavedRoutesFetching } from "@/app/hooks/useSavedRoutesFetching";

/**
 * Renders the Page component with the saved route details based on the provided id.
 *
 * @param {number} params.id - The id of the saved route.
 * @return {JSX.Element}
 */
export default function Page({ params }: { params: { id: number } }) {
  const { routes } = useSavedRoutesFetching();
  const route = routes.find((x) => x.id === Number(params.id));

  return <h1>My Saved Route {route?.name}</h1>;
}
