"use client";

import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "./slices/activitiesSlice";
import savedRoutesReducer from "./slices/savedRoutesSlice";

const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    routes: savedRoutesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
