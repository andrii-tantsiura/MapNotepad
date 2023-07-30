import { createSlice } from "@reduxjs/toolkit";

import { setPinsSearchQueryAction } from "../actions";
import { RootStore } from "../store";

interface IInitialState {
  searchQuery: string | undefined;
}

const initialState: IInitialState = {
  searchQuery: undefined,
};

export const pinsSearchSlice = createSlice({
  name: "pinsSearch",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setPinsSearchQueryAction, (state, action) => {
      state.searchQuery = action.payload;
    });
  },
});

export const selectPinsSearch = (state: RootStore) => state.pinsSearch;
