import { createAction } from "@reduxjs/toolkit";
import { withPayloadType } from "./types";
import { Pin } from "../../../types/map";

export const addPin = createAction("addPin", withPayloadType<Pin>());

export const toggleFavoritePinStatus = createAction(
  "toggleFavoritePinStatus",
  withPayloadType<string>()
);
