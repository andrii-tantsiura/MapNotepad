import { AsyncResult } from "../../helpers/AOResult/types";
import { ICredentials } from "../../types";
import {
  ICreatePinResponse,
  IGetPinsResponse,
  IPinPayload,
} from "../../types/api/firebase";
import { IPinData, IPinDataArray } from "../../types/data";
import { FirebaseRealtimeDBService } from "../FirebaseRealtimeDBService";

export class PinsService {
  private realtimeDBService = new FirebaseRealtimeDBService();

  constructor(credentials: ICredentials | null) {
    this.realtimeDBService.credentials = credentials;
  }

  public getPins = async (): AsyncResult<IPinDataArray> => {
    const getPinsResult = await this.realtimeDBService.get<IGetPinsResponse>(
      "pins.json"
    );

    return getPinsResult;
  };

  public deletePin = async (pinId: string): AsyncResult<null> =>
    this.realtimeDBService.delete(`pins/${pinId}.json`);

  public createPin = async (pin: IPinData): AsyncResult<string> => {
    const result = await this.realtimeDBService.post<
      ICreatePinResponse,
      IPinPayload
    >("pins.json", pin);

    return result.convertTo<string>(result.data?.name);
  };

  public updatePin = async (pin: IPinData): AsyncResult<boolean> => {
    const result = await this.realtimeDBService.put<
      ICreatePinResponse,
      IPinPayload
    >(`pins/${pin.id}.json`, pin);

    return result.convertTo(Boolean(result.data));
  };

  toggleFavoritePinStatus = async (pin: IPinData): AsyncResult<boolean> => {
    const newPin: IPinData = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };
}
