import { configureStore } from "@reduxjs/toolkit";
import pinsSlice from "./slices/pinsSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    pins: pinsSlice.reducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
