import { pinModelToPinPayload } from "../converters";
import { AsyncResult } from "../helpers/AOResult/types";
import { IFirebaseRestService, IPinsService } from "../interfaces";
import { IPinPayload } from "../types/api/firebase";
import { ICredentialsModel, IPinModel, IPinModelsArray } from "../types/models";
import { stringToKeywords } from "../utils";
import { FirebaseDatabaseService } from "./FirebaseDatabaseService";

export class PinsService implements IPinsService {
  private _restService: IFirebaseRestService;

  constructor(credentials: ICredentialsModel | null) {
    this._restService = new FirebaseDatabaseService(
      credentials?.userId ?? "Undefined User Id"
    );
  }

  public getPins = async (): AsyncResult<IPinModelsArray> =>
    this._restService.get<IPinModel>("pins/");

  filterPinsBySearchQuery = (
    pins: IPinModelsArray,
    searchQuery: string
  ): IPinModelsArray => {
    const keywords = stringToKeywords(searchQuery);

    return pins.filter((pin) => {
      const label = pin.label.toLowerCase();
      const description = pin.description?.toLowerCase();
      const latitude = pin.location.latitude.toString();
      const longitude = pin.location.longitude.toString();

      return keywords.some(
        (key) =>
          label.includes(key) ||
          description?.includes(key) ||
          latitude.includes(key) ||
          longitude.includes(key)
      );
    });
  };

  public deletePin = async (pinId: string): AsyncResult<void> =>
    this._restService.delete(`pins/${pinId}`);

  public createPin = async (pin: IPinModel): AsyncResult<string> => {
    const payload = pinModelToPinPayload(pin);

    return this._restService.post<IPinPayload, string>("pins/", payload);
  };

  public updatePin = async (pin: IPinModel): AsyncResult<void> => {
    const payload = pinModelToPinPayload(pin);

    return await this._restService.put<IPinPayload>(`pins/${pin.id}`, payload);
  };

  toggleFavoritePinStatus = async (pin: IPinModel): AsyncResult<void> => {
    const newPin: IPinModel = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };
}
