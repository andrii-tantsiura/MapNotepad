import { createAction } from "@reduxjs/toolkit";

import { IPinModel } from "../../../types/models";
import { withPayload } from "./types";

export const setPinsAction = createAction(
  "setPins",
  withPayload<Array<IPinModel>>()
);

export const addPinAction = createAction("addPin", withPayload<IPinModel>());

export const updatePinAction = createAction(
  "updatePin",
  withPayload<IPinModel>()
);

export const toggleFavoritePinStatusAction = createAction(
  "toggleFavoritePinStatus",
  withPayload<string>()
);

export const deletePinAction = createAction("deletePin", withPayload<string>());

export const setFilterQuery = createAction("deletePin", withPayload<string>());
