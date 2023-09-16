import { createAction } from "@reduxjs/toolkit";
import { LatLng } from "react-native-maps";

import { withPayload } from "./types";

export const setUserLocationAction = createAction(
  "setUserLocation",
  withPayload<LatLng | null>()
);
