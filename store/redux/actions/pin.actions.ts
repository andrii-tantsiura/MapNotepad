import { createAction } from "@reduxjs/toolkit";

import { IPin } from "../../../types";
import { withPayloadType } from "./types";

export const addPin = createAction("addPin", withPayloadType<IPin>());

export const updatePin = createAction("updatePin", withPayloadType<IPin>());

export const toggleFavoritePinStatus = createAction(
  "toggleFavoritePinStatus",
  withPayloadType<string>()
);

export const deletePin = createAction("deletePin", withPayloadType<string>());
