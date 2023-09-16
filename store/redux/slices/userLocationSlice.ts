import { createSlice } from "@reduxjs/toolkit";
import { LatLng } from "react-native-maps";

import { DEFAULT_REGION } from "../../../constants";
import { setUserLocationAction } from "../actions/userLocation.actions";
import { RootStore } from "../store";

interface IInitialState {
  userLocation: LatLng | null;
}

const initialState: IInitialState = {
  userLocation: DEFAULT_REGION,
};

export const userLocationSlice = createSlice({
  name: "userLocation",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserLocationAction, (state, action) => {
      state.userLocation = action.payload;
    });
  },
});

export const selectUserLocation = (store: RootStore) =>
  store.userLocation.userLocation;
