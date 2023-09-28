import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { authSlice, pinsSlice, searchSlice, userLocationSlice } from "./slices";
import { settingsSlice } from "./slices/settingsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pins: pinsSlice.reducer,
    search: searchSlice.reducer,
    userLocation: userLocationSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
