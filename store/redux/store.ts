import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import pinsSlice from "./slices/pinsSlice";

const store = configureStore({
  reducer: {
    pins: pinsSlice.reducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
