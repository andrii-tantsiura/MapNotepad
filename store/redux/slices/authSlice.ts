import { createSlice } from "@reduxjs/toolkit";

import { ICredentialsModel } from "../../../types/models";
import { loginAction, logoutAction } from "../actions";
import { RootStore } from "../store";

interface IInitialState {
  credentials: ICredentialsModel | null;
  isAuthenticated: boolean;
}

const initialState: IInitialState = {
  credentials: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction, (state, action) => {
        state.credentials = action.payload;
        state.isAuthenticated = Boolean(action.payload);
      })
      .addCase(logoutAction, (state) => {
        state.credentials = null;
        state.isAuthenticated = false;
      });
  },
});

export const selectAuth = (state: RootStore) => state.auth;
