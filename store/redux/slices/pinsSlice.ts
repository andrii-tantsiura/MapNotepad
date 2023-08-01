import { createSlice } from "@reduxjs/toolkit";

import { IPinModelsArray } from "../../../types/models";
import {
  addPinAction,
  deletePinAction,
  setPinsAction,
  toggleFavoritePinStatusAction,
  updatePinAction,
} from "../actions/pins.actions";
import { RootStore } from "../store";

type InitialState = {
  pins: IPinModelsArray;
};

const initialState: InitialState = {
  pins: [],
};

export const pinsSlice = createSlice({
  name: "pins",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPinAction, (state, action) => {
        state.pins.push(action.payload);
      })
      .addCase(toggleFavoritePinStatusAction, (state, action) => {
        state.pins = state.pins.map((item) =>
          action.payload === item.id
            ? { ...item, isFavorite: !item.isFavorite }
            : item
        );
      })
      .addCase(updatePinAction, (state, action) => {
        const id = action.payload.id;
        state.pins = state.pins.map((x) => (x.id === id ? action.payload : x));
      })
      .addCase(deletePinAction, (state, action) => {
        state.pins = state.pins.filter((x) => x.id !== action.payload);
      })
      .addCase(setPinsAction, (state, action) => {
        state.pins = action.payload;
      });
  },
});

export const selectPins = (state: RootStore) => state.pins.pins;
