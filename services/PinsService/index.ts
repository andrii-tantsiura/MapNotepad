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
import { FirebaseRestService } from "../FirebaseRestService";
import { IPinsService } from "./types";

export class PinsService implements IPinsService {
  private _restService: FirebaseRestService;

  constructor(credentials: ICredentialsModel | null) {
    this._restService = new FirebaseRestService(credentials);
  }

  public getPins = async (): AsyncResult<IPinModelsArray> =>
    this._restService.get<IGetPinsResponse>("pins.json");

  public deletePin = async (pinId: string): AsyncResult<void> =>
    this._restService.delete(`pins/${pinId}.json`);

  public createPin = async (pin: IPinModel): AsyncResult<string> => {
    const result = await this._restService.post<
      ICreatePinResponse,
      IPinPayload
    >("pins.json", pin);

    return result.convertTo<string>(result.data?.name);
  };

  public updatePin = async (pin: IPinModel): AsyncResult<boolean> => {
    const result = await this._restService.put<ICreatePinResponse, IPinPayload>(
      `pins/${pin.id}.json`,
      pin
    );

    return result.convertTo(Boolean(result.data));
  };

  toggleFavoritePinStatus = async (pin: IPinModel): AsyncResult<boolean> => {
    const newPin: IPinModel = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };
}
