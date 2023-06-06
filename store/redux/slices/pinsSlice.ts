import { createSlice } from "@reduxjs/toolkit";

import { Pin } from "../../../types/map";
import {
  addPin,
  deletePin,
  toggleFavoritePinStatus,
  updatePin,
} from "../actions/pin.actions";
import { RootStore } from "../store";

type InitialState = {
  pins: Array<Pin>;
};

const initialState: InitialState = {
  pins: [
    {
      id: "1",
      label: "Googleplex",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ipsam! Nisi aut tempore ",
      location: {
        latitude: 37.4220936,
        longitude: -122.08392,
      },
      isFavorite: true,
    },
    {
      id: "2",
      label: "Google B43",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ipsam! Nisi aut tempore ",
      location: {
        latitude: 37.4223201,
        longitude: -122.08459,
      },
      isFavorite: true,
    },
    {
      id: "3",
      label: "Balance By",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ipsam! Nisi aut tempore ",
      location: {
        latitude: 37.4358232,
        longitude: -122.0707,
      },
      isFavorite: true,
    },
    {
      id: "4",
      label: "Google 1098 Alta",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ipsam! Nisi aut tempore ",
      location: {
        latitude: 37.4203611,
        longitude: -122.08616,
      },
      isFavorite: true,
    },
    {
      id: "5",
      label: "Google 1098 Alta",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ipsam! Nisi aut tempore ",
      location: {
        latitude: 37.42,
        longitude: -122.085,
      },
      isFavorite: true,
    },
    {
      id: "6",
      label: "Google 1098 Alta",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ipsam! Nisi aut tempore ",
      location: {
        latitude: 37.415,
        longitude: -122.08,
      },
      isFavorite: true,
    },
  ],
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
      });
  },
});

export const selectPins = (state: RootStore) => state.pins.pins;

export default pinsSlice;
