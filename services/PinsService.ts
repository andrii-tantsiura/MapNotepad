import { pinModelToPinPayload } from "../converters";
import { ErrorMessages } from "../enums";
import { AsyncResult } from "../helpers/AOResult/types";
import { IFirebaseRestService, IPinsService } from "../interfaces";
import { IPinPayload } from "../types/api/firebase";
import { ICredentialsModel, IPinModel } from "../types/models";
import { stringToKeywords } from "../utils";
import { FirebaseDatabaseService } from "./FirebaseDatabaseService";

export class PinsService implements IPinsService {
  private _restService: IFirebaseRestService;
  private _pathToPins: string;

  constructor(credentials: ICredentialsModel | null) {
    this._restService = new FirebaseDatabaseService();

    const userId = credentials
      ? credentials.userId
      : ErrorMessages.UNDEFINED_USER_ID;

    this._pathToPins = `pins/${userId}`;
  }

  public getPins = async (): AsyncResult<Array<IPinModel>> =>
    this._restService.getArray<IPinModel>(this._pathToPins);

  filterPinsBySearchQuery = (
    pins: Array<IPinModel>,
    searchQuery: string
  ): Array<IPinModel> => {
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
    this._restService.delete(`${this._pathToPins}/${pinId}`);

  public createPin = async (pin: IPinModel): AsyncResult<string> => {
    const payload = pinModelToPinPayload(pin);

    return this._restService.post<IPinPayload, string>(
      this._pathToPins,
      payload
    );
  };

  public updatePin = async (pin: IPinModel): AsyncResult<void> => {
    const payload = pinModelToPinPayload(pin);

    return await this._restService.put<IPinPayload>(
      `${this._pathToPins}/${pin.id}`,
      payload
    );
  };

  toggleFavoritePinStatus = async (pin: IPinModel): AsyncResult<void> => {
    const newPin: IPinModel = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };
}
