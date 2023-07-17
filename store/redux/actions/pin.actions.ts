import { createAction } from "@reduxjs/toolkit";

import { IPin } from "../../../types";
import { withPayloadType } from "./types";

export const setPinsAction = createAction("setPins", withPayloadType<IPin[]>());

export const addPinAction = createAction("addPin", withPayloadType<IPin>());

export const updatePinAction = createAction(
  "updatePin",
  withPayloadType<IPin>()
);

export const toggleFavoritePinStatusAction = createAction(
  "toggleFavoritePinStatus",
  withPayloadType<string>()
);

export const deletePinAction = createAction(
  "deletePin",
  withPayloadType<string>()
);
