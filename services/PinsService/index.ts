import { FIREBASE_DATABASE_API_URL } from "../../config";
import { AOResult } from "../../helpers/AOResult";
import {
  ICreatePinResponse,
  IPin,
  IPinPayload,
  IPinsResponse,
} from "../../types";
import {
  createFirebaseRequestConfig,
  requestWithPayload,
  requestWithoutPayload,
} from "../../utils";

class PinsService {
  createPin = async (pin: IPinPayload): Promise<AOResult<string>> => {
    const result = await requestWithPayload<IPinPayload, ICreatePinResponse>(
      "post",
      FIREBASE_DATABASE_API_URL + "/pins.json",
      pin
    );

    return result.convertTo<string>(result.result?.name);
  };

  updatePin = async (pin: IPin): Promise<AOResult<boolean>> => {
    const { id, ...restFields } = pin;

    const pinPayload: IPinPayload = { ...restFields };

    const result = await requestWithPayload(
      "put",
      FIREBASE_DATABASE_API_URL + `/pins/${pin.id}.json`,
      pinPayload
    );

    return result.convertTo(Boolean(result.result));
  };

  toggleFavoritePinStatus = async (pin: IPin) => {
    const newPin = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };

  deletePin = async (pinId: string): Promise<AOResult<null>> => {
    return requestWithoutPayload(
      "delete",
      FIREBASE_DATABASE_API_URL + `/pins/${pinId}.json`
    );
  };

  getPins = async (): Promise<AOResult<Array<IPin>>> => {
    const result = await requestWithoutPayload<IPinsResponse>(
      "get",
      FIREBASE_DATABASE_API_URL + "/pins.json",
      createFirebaseRequestConfig()
    );

    return result.convertTo(result.result);
  };
}

export default new PinsService();
