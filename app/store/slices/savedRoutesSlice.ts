"use client";

import { Activity, ActivityResponse } from "@/types/Strava";
import polyline from "@mapbox/polyline";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SavedRoutesState {
  routes: Activity[];
}

const initialState: SavedRoutesState = {
  routes: [],
};

const savedRoutesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    /**
     * Updates the saved routes state with the provided activity responses.
     *
     * @param {SavedRoutesState} state - The current state of the saved routes.
     * @param {PayloadAction<ActivityResponse[]>} action - The action containing the activity responses.
     * @return {void}
     */
    setSavedRoutes: (state, action: PayloadAction<ActivityResponse[]>) => {
      state.routes = action.payload?.map((route) => ({
        id: route.id,
        name: route.name,
        positions: polyline.decode(route.map.summary_polyline),
      }));
    },
    /**
     * Adds a saved route to the state.
     *
     * @param {SavedRoutesState} state - The current state of the saved routes.
     * @param {PayloadAction<Activity>} action - The action containing the activity to be added.
     * @return {void}
     */
    addSavedRoute: (state, action: PayloadAction<Activity>) => {
      state.routes.push(action.payload);
    },
  },
});

export const { setSavedRoutes, addSavedRoute } = savedRoutesSlice.actions;
export default savedRoutesSlice.reducer;
