"use client";

import { ActivityResponse, Athlete, AuthResponseData } from "@/types/Strava";
import axios from "axios";

/**
 * Authenticates the user by sending a POST request to the Strava API to refresh the access token.
 *
 * @return {Promise<AuthResponseData>} A promise that resolves to the authentication response data.
 */
const authenticate = async (): Promise<AuthResponseData> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/oauth/token?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET}&refresh_token=${process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`,
  );
  return data;
};

/**
 * Fetches a list of activities for the authenticated user.
 *
 * @param {string} access_token - The access token for authentication. Optional.
 * @return {Promise<ActivityResponse[]>} A promise that resolves to an array of ActivityResponse objects.
 */
const fetchActivities = async (
  access_token?: string,
): Promise<ActivityResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/api/v3/athlete/activities?access_token=${access_token}&per_page=200`,
  );
  return data;
};

/**
 * Retrieves the current athlete's data using the provided access token.
 *
 * @param {string} [access_token] - The access token for authentication. Optional.
 * @return {Promise<Athlete>} A promise that resolves to the current athlete's data.
 */
const getCurrentAthlete = async (access_token?: string): Promise<Athlete> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/api/v3/athlete?access_token=${access_token}`,
  );
  return data;
};

/**
 * Fetches the saved routes for a given athlete using their ID and access token.
 *
 * @param {number} [athleteId] - The ID of the athlete. Optional.
 * @param {string} [access_token] - The access token for authentication. Optional.
 * @return {Promise<ActivityResponse[]>} A promise that resolves to an array of ActivityResponse objects representing the saved routes.
 */
const fetchSavedRoutes = async (
  athleteId?: number,
  access_token?: string,
): Promise<ActivityResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/api/v3/athletes/${athleteId}/routes?access_token=${access_token}&per_page=200`,
  );
  return data;
};

export { authenticate, fetchActivities, fetchSavedRoutes, getCurrentAthlete };
