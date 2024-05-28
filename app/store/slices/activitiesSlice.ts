"use client";

import { Activity, ActivityResponse } from "@/types/Strava";
import polyline from "@mapbox/polyline";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ActivitiesState {
  activities: Activity[];
}

const initialState: ActivitiesState = {
  activities: [],
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<ActivityResponse[]>) => {
      state.activities = action.payload?.map((activity) => ({
        id: activity.id,
        name: activity.name,
        positions: polyline.decode(activity.map.summary_polyline),
      }));
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.push(action.payload);
    },
  },
});

export const { setActivities, addActivity } = activitiesSlice.actions;
export default activitiesSlice.reducer;
