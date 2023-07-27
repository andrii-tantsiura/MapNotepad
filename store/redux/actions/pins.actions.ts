import { createAction } from "@reduxjs/toolkit";

import { IPin, IPins } from "../../../types";
import { withPayload } from "./types";

export const setPinsAction = createAction("setPins", withPayload<IPins>());

export const addPinAction = createAction("addPin", withPayload<IPin>());

export const updatePinAction = createAction("updatePin", withPayload<IPin>());

export const toggleFavoritePinStatusAction = createAction(
  "toggleFavoritePinStatus",
  withPayload<string>()
);

export const deletePinAction = createAction("deletePin", withPayload<string>());

export const setFilterQuery = createAction("deletePin", withPayload<string>());
