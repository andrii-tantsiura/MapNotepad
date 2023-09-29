import { createSlice } from "@reduxjs/toolkit";

import { DarkAppColors, IAppColors, LightAppColors } from "../../../constants";
import { AppThemes } from "../../../enums";
import { setAppThemeAction } from "../actions/settings.action";
import { RootStore } from "../store";

interface IInitialState {
  appTheme: AppThemes;
  appColors: IAppColors;
}

const initialState: IInitialState = {
  appTheme: AppThemes.Dark,
  appColors: DarkAppColors,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAppThemeAction, (state, action) => {
      state.appTheme = action.payload;
      state.appColors =
        action.payload === AppThemes.Light ? LightAppColors : DarkAppColors;
    });
  },
});

export const selectSettings = (state: RootStore) => state.settings;
