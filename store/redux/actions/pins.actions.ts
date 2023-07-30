import { createAction } from "@reduxjs/toolkit";

import { IPinData, IPinDataArray } from "../../../types/data";
import { withPayload } from "./types";

export const setPinsAction = createAction(
  "setPins",
  withPayload<IPinDataArray>()
);

export const addPinAction = createAction("addPin", withPayload<IPinData>());

export const updatePinAction = createAction(
  "updatePin",
  withPayload<IPinData>()
);

export const toggleFavoritePinStatusAction = createAction(
  "toggleFavoritePinStatus",
  withPayload<string>()
);

export const deletePinAction = createAction("deletePin", withPayload<string>());

export const setFilterQuery = createAction("deletePin", withPayload<string>());
