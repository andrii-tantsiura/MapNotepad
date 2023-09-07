import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { authSlice, searchSlice, pinsSlice } from "./slices";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pins: pinsSlice.reducer,
    search: searchSlice.reducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
