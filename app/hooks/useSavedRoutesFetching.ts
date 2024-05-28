import { useQuery } from "@tanstack/react-query";
import { fetchSavedRoutes, getCurrentAthlete } from "../api/api";
import { useAuthTokenManager } from "./useAuthTokenManager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { setSavedRoutes } from "../store/slices/savedRoutesSlice";
import { ActivityResponse } from "@/types/Strava";

export const useCurrentAthleteQuery = (authToken: string | undefined) =>
  useQuery({
    queryKey: ["currentAthlete"],
    queryFn: () => getCurrentAthlete(authToken),
    enabled: !!authToken,
    refetchOnWindowFocus: false,
  });

export const useSavedRoutesQuery = (athleteId?: number, authToken?: string) =>
  useQuery({
    queryKey: ["savedRoutes"],
    queryFn: () => fetchSavedRoutes(athleteId, authToken),
    enabled: !!authToken && !!athleteId,
    refetchOnWindowFocus: false,
  });

export function useSavedRoutesFetching() {
  // retrieve auth token from the token manager
  const { getToken } = useAuthTokenManager();
  // fetch current user data from api
  const {
    data: currentUser,
    error: currentUserError,
    isLoading: currentUserLoading,
  } = useCurrentAthleteQuery(getToken());
  // fetch saved routes data from api
  const {
    data: routes,
    error: routesError,
    isLoading: routesLoading,
  } = useSavedRoutesQuery(currentUser?.id, getToken());
  const dispatch = useDispatch();
  // instance of stored routes data in the store
  const storedRoutes = useSelector((state: RootState) => state.routes.routes);

  useEffect(() => {
    // on api fetch result, set activities data to the store
    dispatch(setSavedRoutes((routes as ActivityResponse[]) || []));
  }, [dispatch, routes]);

  return { routes: storedRoutes, routesLoading, routesError };
}
