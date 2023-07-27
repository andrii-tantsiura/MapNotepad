import { createAction } from "@reduxjs/toolkit";
import { withPayload } from "./types";

export const setPinsSearchQueryAction = createAction(
  "setPinsSearchQuery",
  withPayload<string>()
);
