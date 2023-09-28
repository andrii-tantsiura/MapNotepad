import { createSlice } from "@reduxjs/toolkit";

import { AppThemes } from "../../../enums";
import { setAppThemeAction } from "../actions/settings.action";
import { RootStore } from "../store";

interface IInitialState {
  appTheme: AppThemes;
}

const initialState: IInitialState = {
  appTheme: AppThemes.Light,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAppThemeAction, (state, action) => {
      state.appTheme = action.payload;
    });
  },
});

export const selectSettings = (state: RootStore) => state.settings;
