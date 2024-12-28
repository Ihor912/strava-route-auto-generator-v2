"use client";

import { OpenRouteResponse } from "@/types/OpenRoute";
import { Activity } from "@/types/Strava";
import polyline from "@mapbox/polyline";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoGenerateNewRoute } from "../api/api";
import { showErrorToast } from "../ui/toast";

export const useNewRouteAutoGenerationQuery = () =>
  useQuery({
    queryKey: ["newRoute"],
    queryFn: () => autoGenerateNewRoute(),
    enabled: true,
    refetchOnWindowFocus: false,
  });

export function useNewRouteAutoGeneration() {
  const {
    data: newRoute,
    error: newRouteError,
    isLoading: newRouteLoading,
  } = useNewRouteAutoGenerationQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (newRouteError) {
      showErrorToast(
        newRouteError.message || "An error occurred while fetching activities",
      );
      return;
    }
  }, [dispatch, newRouteError]);

  return {
    newRoute: newRoute
      ? convertToRouteStructure(newRoute, 1, "New Route")
      : null,
    newRouteLoading,
  };
}

function convertToRouteStructure(
  data: OpenRouteResponse,
  routeId: number,
  routeName: string,
): Activity {
  // Decode polyline to coordinates
  const decodedCoordinates = polyline.decode(data?.geometry);

  const route: Activity = {
    id: routeId,
    name: routeName,
    positions: decodedCoordinates,
  };

  return route;
}
