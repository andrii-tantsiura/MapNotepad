import { createSlice } from "@reduxjs/toolkit";

import {
  setSearchQueryAction,
  startSearchAction,
  stopSearchAction,
} from "../actions";
import { RootStore } from "../store";

interface IInitialState {
  isActive: boolean;
  searchQuery: string;
}

const initialState: IInitialState = {
  isActive: false,
  searchQuery: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startSearchAction, (state) => {
        state.isActive = true;
      })
      .addCase(setSearchQueryAction, (state, action) => {
        state.searchQuery = action.payload;
      })
      .addCase(stopSearchAction, (state) => {
        state.isActive = false;
        state.searchQuery = "";
      });
  },
});

export const selectSearch = (state: RootStore) => state.search;
