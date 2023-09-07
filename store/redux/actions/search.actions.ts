import { createAction } from "@reduxjs/toolkit";
import { withPayload } from "./types";

export const startSearchAction = createAction("startSearch");

export const setSearchQueryAction = createAction(
  "setSearchQuery",
  withPayload<string>()
);

export const stopSearchAction = createAction("stopSearch");
