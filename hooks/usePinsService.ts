import { useMemo } from "react";

import { PinsService } from "../services";
import { ICredentials } from "../types";

export const usePinsService = (credentials: ICredentials | null): PinsService =>
  useMemo(() => new PinsService(credentials), [credentials]);
