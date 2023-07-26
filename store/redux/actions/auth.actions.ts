import { createAction } from "@reduxjs/toolkit";

import { ICredentials } from "../../../types";
import { withPayloadType } from "./types";

export const loginAction = createAction(
  "login",
  withPayloadType<ICredentials>()
);

export const logoutAction = createAction("logout");
