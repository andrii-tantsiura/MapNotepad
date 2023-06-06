import { createAction } from "@reduxjs/toolkit";

import { Pin } from "../../../types/map";
import { withPayloadType } from "./types";

export const addPin = createAction("addPin", withPayloadType<Pin>());

export const updatePin = createAction("updatePin", withPayloadType<Pin>());

export const toggleFavoritePinStatus = createAction(
  "toggleFavoritePinStatus",
  withPayloadType<string>()
);

export const deletePin = createAction("deletePin", withPayloadType<string>());
