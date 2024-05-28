"use client";

import { ActivityResponse } from "@/types/Strava";
import { useEffect, useState } from "react";
import { fetchActivities } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthTokenManager } from "./useAuthTokenManager";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "../store/slices/activitiesSlice";
import { RootState } from "../store";
import { showErrorToast } from "../ui/utils/toast";

export const useActivitiesQuery = (authToken: string | undefined) =>
  useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchActivities(authToken),
    enabled: !!authToken,
    refetchOnWindowFocus: false,
  });

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
    (state: RootState) => state.activities.activities
  );

  useEffect(() => {
    if (activitiesError) {
      showErrorToast(
        activitiesError.message || "An error occurred while fetching activities"
      );
      return;
    }

    // on api fetch result, set activities data to the store
    dispatch(setActivities((activities as ActivityResponse[]) || []));
  }, [dispatch, activities, activitiesError]);

  return { activities: storedActivities, activitiesLoading };
}
