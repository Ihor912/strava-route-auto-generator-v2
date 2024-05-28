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
    setSavedRoutes: (state, action: PayloadAction<ActivityResponse[]>) => {
      state.routes = action.payload?.map((route) => ({
        id: route.id,
        name: route.name,
        positions: polyline.decode(route.map.summary_polyline),
      }));
    },
    addSavedRoute: (state, action: PayloadAction<Activity>) => {
      state.routes.push(action.payload);
    },
  },
});

export const { setSavedRoutes, addSavedRoute } = savedRoutesSlice.actions;
export default savedRoutesSlice.reducer;
