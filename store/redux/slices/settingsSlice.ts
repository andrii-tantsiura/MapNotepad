import { createSlice } from "@reduxjs/toolkit";

import {
  AppColorsMapper,
  IAppColors,
  LightAppColors,
} from "../../../constants";
import { AppThemes } from "../../../enums";
import { setAppThemeAction } from "../actions/settings.action";
import { RootStore } from "../store";

interface IInitialState {
  appTheme: AppThemes;
  appColors: IAppColors;
}

const initialState: IInitialState = {
  appTheme: AppThemes.Light,
  appColors: LightAppColors,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAppThemeAction, (state, action) => {
      state.appTheme = action.payload;
      state.appColors = AppColorsMapper[action.payload];
    });
  },
});

export const selectSettings = (state: RootStore) => state.settings;
