import { createSlice } from "@reduxjs/toolkit";
import { RootStore } from "../store";
import { Pin } from "../../../types/map";
import { addPin, toggleFavoritePinStatus } from "../actions/pin.actions";

type InitialState = {
  pins: Array<Pin>;
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
      });
  },
});

export const selectPins = (state: RootStore) => state.pins.pins;

export default pinsSlice;
