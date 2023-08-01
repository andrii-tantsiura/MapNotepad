import { createAction } from "@reduxjs/toolkit";

import { ICredentialsModel } from "../../../types/models";
import { withPayload } from "./types";

export const loginAction = createAction(
  "login",
  withPayload<ICredentialsModel>()
);
export const logoutAction = createAction("logout");
