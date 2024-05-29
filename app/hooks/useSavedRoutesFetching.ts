import { ActivityResponse } from "@/types/Strava";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedRoutes, getCurrentAthlete } from "../api/api";
import { RootState } from "../store";
import { setSavedRoutes } from "../store/slices/savedRoutesSlice";
import { showErrorToast } from "../ui/toast";
import { useAuthTokenManager } from "./useAuthTokenManager";

/**
 * Fetches the current athlete's data using the provided authentication token.
 *
 * @param {string | undefined} authToken - The authentication token to use for the request.
 * @return {QueryResult} The result of the query, containing the current athlete's data.
 */
export const useCurrentAthleteQuery = (authToken: string | undefined) =>
  useQuery({
    queryKey: ["currentAthlete"],
    queryFn: () => getCurrentAthlete(authToken),
    enabled: !!authToken,
    refetchOnWindowFocus: false,
  });

/**
 * Retrieves the saved routes for a given athlete using the provided athlete ID and authentication token.
 *
 * @param {number} athleteId - The ID of the athlete.
 * @param {string} authToken - The authentication token.
 * @return {QueryResult} The result of the query, containing the saved routes.
 */
export const useSavedRoutesQuery = (athleteId?: number, authToken?: string) =>
  useQuery({
    queryKey: ["savedRoutes"],
    queryFn: () => fetchSavedRoutes(athleteId, authToken),
    enabled: !!authToken && !!athleteId,
    refetchOnWindowFocus: false,
  });

/**
 * A custom hook that fetches saved routes data from the API and stores it in the Redux store.
 *
 * @return {Object} An object containing the fetched routes data, a boolean indicating if the current user is loading, and a boolean indicating if the routes are loading.
 */
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
    if (routesError || currentUserError) {
      showErrorToast(
        (routesError || currentUserError)?.message ||
          "An error occurred while fetching saved routes",
      );
      return;
    }

    // on api fetch result, set activities data to the store
    dispatch(setSavedRoutes((routes as ActivityResponse[]) || []));
  }, [dispatch, routes, currentUserError, routesError]);

  return { routes: storedRoutes, currentUserLoading, routesLoading };
}
