import { useMemo } from "react";

import { PinsService } from "../services";
import { ICredentialsModel } from "../types/models";

export const usePinsService = (
  credentials: ICredentialsModel | null
): PinsService => useMemo(() => new PinsService(credentials), [credentials]);
