import { AsyncResult } from "../helpers/AOResult/types";
import { IPinModel } from "../types/models";

export interface IPinsService {
  getPins: () => AsyncResult<Array<IPinModel>>;
  filterPinsBySearchQuery: (
    pins: Array<IPinModel>,
    searchQuery: string
  ) => Array<IPinModel>;
  deletePin: (pinId: string) => AsyncResult<void>;
  createPin: (pin: IPinModel) => AsyncResult<string>;
  updatePin: (pin: IPinModel) => AsyncResult<void>;
  toggleFavoritePinStatus: (pin: IPinModel) => AsyncResult<void>;
}
