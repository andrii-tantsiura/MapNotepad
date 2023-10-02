import { createAction } from "@reduxjs/toolkit";

import { AppThemes } from "../../../enums";
import { withPayload } from "./types";

export const setAppThemeAction = createAction(
  "setAppTheme",
  withPayload<AppThemes>()
);
