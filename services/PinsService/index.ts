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
  createPin = async (
    pin: IPinPayload
  ): Promise<AOResult<ICreatePinResponse>> => {
    return requestWithPayload<IPinPayload, ICreatePinResponse>(
      "post",
      FIREBASE_DATABASE_API_URL + "/pins.json",
      pin
    );
  };

  toggleFavoritePinStatus = async (pin: IPin) => {
    const newPin = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };

  updatePin = async (pin: IPin): Promise<AOResult<ICreatePinResponse>> => {
    const { id, ...restFields } = pin;

    const pinPayload: IPinPayload = { ...restFields };

    return requestWithPayload(
      "put",
      FIREBASE_DATABASE_API_URL + `/pins/${pin.id}.json`,
      pinPayload
    );
  };

  deletePin = async (pinId: string) => {
    return requestWithoutPayload(
      "delete",
      FIREBASE_DATABASE_API_URL + `/pins/${pinId}.json`
    );
  };

  getPins = async () => {
    return requestWithoutPayload<IPinsResponse>(
      "get",
      FIREBASE_DATABASE_API_URL + "/pins.json",
      createFirebaseRequestConfig()
    );
  };
}

export default new PinsService();
