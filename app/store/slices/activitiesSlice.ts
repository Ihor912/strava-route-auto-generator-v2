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
    /**
     * Updates the activities state with the provided activity responses.
     *
     * @param {ActivitiesState} state - The current state of the activities.
     * @param {PayloadAction<ActivityResponse[]>} action - The action containing the activity responses.
     * @return {void}
     */
    setActivities: (state, action: PayloadAction<ActivityResponse[]>) => {
      state.activities = action.payload?.map((activity) => ({
        id: activity.id,
        name: activity.name,
        positions: polyline.decode(activity.map.summary_polyline),
      }));
    },
    /**
     * Adds an activity to the state.
     *
     * @param {object} state - The current state of the activities.
     * @param {PayloadAction<Activity>} action - The action containing the activity to be added.
     * @return {void}
     */
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.push(action.payload);
    },
  },
});

export const { setActivities, addActivity } = activitiesSlice.actions;
export default activitiesSlice.reducer;
