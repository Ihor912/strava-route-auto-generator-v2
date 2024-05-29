"use client";

import { ActivityResponse } from "@/types/Strava";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../api/api";
import { RootState } from "../store";
import { setActivities } from "../store/slices/activitiesSlice";
import { showErrorToast } from "../ui/toast";
import { useAuthTokenManager } from "./useAuthTokenManager";

/**
 * Custom hook that fetches activities data from the API.
 *
 * @param {string | undefined} authToken - The authentication token to use for the request.
 * @return {QueryResult<ActivityResponse[]>} The result of the query, containing the activities data.
 */
export const useActivitiesQuery = (authToken: string | undefined) =>
  useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchActivities(authToken),
    enabled: !!authToken,
    refetchOnWindowFocus: false,
  });

/**
 * Custom hook that fetches activities data from the API and updates the Redux store.
 *
 * @return {Object} An object containing the fetched activities data and a boolean indicating if the activities are loading.
 */
export function useActivitiesFetching() {
  const { getToken } = useAuthTokenManager();
  // fetch activities data from api
  const {
    data: activities,
    error: activitiesError,
    isLoading: activitiesLoading,
  } = useActivitiesQuery(getToken());
  const dispatch = useDispatch();
  // instance of activities data in the store
  const storedActivities = useSelector(
    (state: RootState) => state.activities.activities,
  );

  useEffect(() => {
    if (activitiesError) {
      showErrorToast(
        activitiesError.message ||
          "An error occurred while fetching activities",
      );
      return;
    }

    // on api fetch result, set activities data to the store
    dispatch(setActivities((activities as ActivityResponse[]) || []));
  }, [dispatch, activities, activitiesError]);

  return { activities: storedActivities, activitiesLoading };
}
