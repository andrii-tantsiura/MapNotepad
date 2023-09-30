import { createSlice } from "@reduxjs/toolkit";

import { LightThemeResource, ThemeResourceMapper } from "../../../constants";
import { IThemeResource } from "../../../constants/themes/types";
import { AppThemes } from "../../../enums";
import { setAppThemeAction } from "../actions/settings.action";
import { RootStore } from "../store";

interface IInitialState {
  currentTheme: AppThemes;
  themeResource: IThemeResource;
}

const initialState: IInitialState = {
  currentTheme: AppThemes.Light,
  themeResource: LightThemeResource,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAppThemeAction, (state, action) => {
      state.currentTheme = action.payload;
      state.themeResource = ThemeResourceMapper[action.payload];
    });
  },
});

export const selectSettings = (state: RootStore) => state.settings;
