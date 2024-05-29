"use client";

import { AuthResponseData } from "@/types/Strava";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { authenticate } from "../api/api";
import { showErrorToast } from "../ui/toast";

const AUTH_TOKEN_KEY = "auth_token";
const EXPIRES_IN_KEY = "token_expires_in";

/**
 * A custom hook that fetches the Strava authentication data using the `useQuery` hook from `react-query`.
 *
 * @param {boolean} tokenExpired - Indicates whether the authentication token has expired.
 * @return {QueryResult<AuthResponseData>} The result of the authentication query, containing the authentication data.
 */
export const useStravaAuthQuery = (tokenExpired: boolean) =>
  useQuery<AuthResponseData>({
    queryKey: ["auth"],
    queryFn: authenticate,
    enabled: !!tokenExpired,
    refetchOnWindowFocus: false,
  });

/**
 * Custom hook that manages the authentication token and checks its expiration.
 *
 * @returns {Object} An object containing the following properties:
 *   - isTokenExpired: A boolean indicating whether the token is expired.
 *   - setToken: A function that sets the authentication token and its expiration time.
 *   - getToken: A function that retrieves the authentication token from local storage.
 *   - clearToken: A function that clears the authentication token from local storage.
 */
export function useAuthTokenManager() {
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const { data: auth, error: authError } = useStravaAuthQuery(isTokenExpired);

  useEffect(() => {
    if (authError) {
      showErrorToast(
        authError.message || "An error occurred while authenticating",
      );
      return;
    }

    /**
     * Checks the expiration of the authentication token stored in local storage.
     *
     * This function retrieves the expiration timestamp from local storage and compares it with the current time.
     * If the current time is greater than the expiration timestamp, the isTokenExpired state is set to true.
     *
     * @return {void}
     */
    const checkTokenExpiration = () => {
      const expirationTimestampStr = localStorage.getItem(EXPIRES_IN_KEY);

      if (!expirationTimestampStr) {
        setIsTokenExpired(true);
        return;
      }

      const expirationTimestamp = parseInt(expirationTimestampStr, 10);
      const now = Date.now();

      setIsTokenExpired(now > expirationTimestamp);
    };

    checkTokenExpiration();

    if (auth && getToken() !== auth.access_token) {
      setToken(auth.access_token, auth.expires_in);
    }
  }, [auth, authError]);

  /**
   * Checks if local storage is available in the current environment.
   *
   * @return {boolean}
   */
  const localStorageAvailable = () => {
    return typeof window !== "undefined";
  };

  /**
   * Sets the authentication token and its expiration time in local storage.
   *
   * @param {string} token - The authentication token to be set.
   * @param {number} expiresIn - The duration in seconds for which the token is valid.
   * @return {void}
   */
  const setToken = (token: string, expiresIn: number) => {
    const expirationTimestamp = Date.now() + expiresIn * 1000;

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(EXPIRES_IN_KEY, expirationTimestamp.toString());
    setIsTokenExpired(false);
  };

  /**
   * Retrieves the authentication token from local storage if it is available.
   *
   * @return {string | undefined} The authentication token, or undefined if it is not available.
   */
  const getToken = () => {
    return (
      (localStorageAvailable() &&
        window.localStorage.getItem(AUTH_TOKEN_KEY)) ||
      undefined
    );
  };

  /**
   * Clears the authentication token and its expiration time from local storage and sets the isTokenExpired state to true.
   *
   * @return {void}
   */
  const clearToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_IN_KEY);
    setIsTokenExpired(true);
  };

  return { isTokenExpired, setToken, getToken, clearToken };
}
