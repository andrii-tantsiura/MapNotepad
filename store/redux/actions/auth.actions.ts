import { createAction } from "@reduxjs/toolkit";

import { ICredentials } from "../../../types";
import { withPayload } from "./types";

export const loginAction = createAction("login", withPayload<ICredentials>());
export const logoutAction = createAction("logout");
