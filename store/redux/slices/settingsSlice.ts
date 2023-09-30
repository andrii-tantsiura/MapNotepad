import { createSlice } from "@reduxjs/toolkit";

import { LightAppTheme, ThemeSourceMapper } from "../../../constants";
import { IAppTheme } from "../../../constants/themes/types";
import { AppThemes } from "../../../enums";
import { setAppThemeAction } from "../actions/settings.action";
import { RootStore } from "../store";

interface IInitialState {
  currentTheme: AppThemes;
  themeSource: IAppTheme;
}

const initialState: IInitialState = {
  currentTheme: AppThemes.Light,
  themeSource: LightAppTheme,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAppThemeAction, (state, action) => {
      state.currentTheme = action.payload;
      state.themeSource = ThemeSourceMapper[action.payload];
    });
  },
});

export const selectSettings = (state: RootStore) => state.settings;
