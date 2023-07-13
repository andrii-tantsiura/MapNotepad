import { createSlice } from "@reduxjs/toolkit";

import { IPin } from "../../../types";
import {
  addPin,
  deletePin,
  setPins,
  toggleFavoritePinStatus,
  updatePin,
} from "../actions/pin.actions";
import { RootStore } from "../store";

type InitialState = {
  pins: Array<IPin>;
};

const initialState: InitialState = {
  pins: [],
};

const pinsSlice = createSlice({
  name: "pins",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPin, (state, action) => {
        state.pins.push(action.payload);
      })
      .addCase(toggleFavoritePinStatus, (state, action) => {
        state.pins = state.pins.map((item) =>
          action.payload === item.id
            ? { ...item, isFavorite: !item.isFavorite }
            : item
        );
      })
      .addCase(updatePin, (state, action) => {
        const id = action.payload.id;
        state.pins = state.pins.map((x) => (x.id === id ? action.payload : x));
      })
      .addCase(deletePin, (state, action) => {
        state.pins = state.pins.filter((x) => x.id !== action.payload);
      })
      .addCase(setPins, (state, action) => {
        state.pins = action.payload;
      });
  },
});

export const selectPins = (state: RootStore) => state.pins.pins;

export default pinsSlice;
