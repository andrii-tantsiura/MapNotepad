import { AsyncResult } from "../../helpers/AOResult/types";
import { IPinModel, IPinModelsArray } from "../../types/models";

export interface IPinsService {
  getPins: () => AsyncResult<IPinModelsArray>;
  deletePin: (pinId: string) => AsyncResult<void>;
  createPin: (pin: IPinModel) => AsyncResult<string>;
  updatePin: (pin: IPinModel) => AsyncResult<boolean>;
  toggleFavoritePinStatus: (pin: IPinModel) => AsyncResult<boolean>;
}
