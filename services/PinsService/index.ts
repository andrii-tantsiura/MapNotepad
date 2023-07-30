import { AsyncResult } from "../../helpers/AOResult/types";
import {
  ICreatePinResponse,
  IGetPinsResponse,
  IPinPayload,
} from "../../types/api/firebase";
import {
  ICredentialsModel,
  IPinModel,
  IPinModelsArray,
} from "../../types/models";
import { FirebaseRealtimeDBService } from "../FirebaseRealtimeDBService";

export class PinsService {
  private realtimeDBService = new FirebaseRealtimeDBService();

  constructor(credentials: ICredentialsModel | null) {
    this.realtimeDBService.credentials = credentials;
  }

  public getPins = async (): AsyncResult<IPinModelsArray> => {
    const getPinsResult = await this.realtimeDBService.get<IGetPinsResponse>(
      "pins.json"
    );

    return getPinsResult;
  };

  public deletePin = async (pinId: string): AsyncResult<null> =>
    this.realtimeDBService.delete(`pins/${pinId}.json`);

  public createPin = async (pin: IPinModel): AsyncResult<string> => {
    const result = await this.realtimeDBService.post<
      ICreatePinResponse,
      IPinPayload
    >("pins.json", pin);

    return result.convertTo<string>(result.data?.name);
  };

  public updatePin = async (pin: IPinModel): AsyncResult<boolean> => {
    const result = await this.realtimeDBService.put<
      ICreatePinResponse,
      IPinPayload
    >(`pins/${pin.id}.json`, pin);

    return result.convertTo(Boolean(result.data));
  };

  toggleFavoritePinStatus = async (pin: IPinModel): AsyncResult<boolean> => {
    const newPin: IPinModel = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };
}
