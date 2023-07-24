import { AsyncResult } from "../../helpers/AOResult/types";
import {
  ICreatePinResponse,
  ICredentials,
  IPin,
  IPinPayload,
  IPins,
} from "../../types";
import { FirebaseRealtimeDBService } from "../FirebaseRealtimeDBService";

export class PinsService {
  private realtimeDBService = new FirebaseRealtimeDBService();

  constructor(credentials: ICredentials | null) {
    this.realtimeDBService.credentials = credentials;
  }

  public getPins = async (): AsyncResult<IPins> =>
    this.realtimeDBService.get<IPins>("pins.json");

  public deletePin = async (pinId: string): AsyncResult<null> =>
    this.realtimeDBService.delete(`pins/${pinId}.json`);

  public createPin = async (pin: IPinPayload): AsyncResult<string> => {
    const result = await this.realtimeDBService.post<
      ICreatePinResponse,
      IPinPayload
    >("pins.json", pin);

    return result.convertTo<string>(result.data?.name);
  };

  public updatePin = async (pin: IPin): AsyncResult<boolean> => {
    const result = await this.realtimeDBService.put<
      ICreatePinResponse,
      IPinPayload
    >(`pins/${pin.id}.json`, pin);

    return result.convertTo(Boolean(result.data));
  };

  toggleFavoritePinStatus = async (pin: IPin): AsyncResult<boolean> => {
    const newPin = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };
}
