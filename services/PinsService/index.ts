import { createUrlWithAuth } from "../../helpers";
import { AOResult } from "../../helpers/AOResult";
import { AwaitedResult } from "../../helpers/AOResult/types";
import {
  ICreatePinResponse,
  ICredentials,
  IPin,
  IPinPayload,
  IPins,
} from "../../types";
import {
  createFirebaseRequestConfig,
  requestWithPayload,
  requestWithoutPayload,
} from "../../utils";

class PinsService {
  public credentials: ICredentials | null = null;

  createPin = async (pin: IPinPayload): AwaitedResult<string> => {
    let result = new AOResult<string>();

    if (this.credentials) {
      const requestResult = await requestWithPayload<
        IPinPayload,
        ICreatePinResponse
      >("post", createUrlWithAuth("pins.json", this.credentials), pin);

      result = requestResult.convertTo<string>(requestResult.data?.name);
    }

    return result;
  };

  updatePin = async (pin: IPin): AwaitedResult<boolean> => {
    let result = new AOResult<boolean>();

    if (this.credentials) {
      const { id, ...restFields } = pin;
      const payload: IPinPayload = { ...restFields };

      const url = createUrlWithAuth(`pins/${id}.json`, this.credentials);

      const requestResult = await requestWithPayload<
        IPinPayload,
        ICreatePinResponse
      >("put", url, payload);

      result = requestResult.convertTo(Boolean(requestResult.data));
    }

    return result;
  };

  toggleFavoritePinStatus = async (pin: IPin) => {
    const newPin = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };

  deletePin = async (pinId: string): AwaitedResult<null> => {
    let result = new AOResult();

    if (this.credentials) {
      const url = createUrlWithAuth(`pins/${pinId}.json`, this.credentials);

      result = await requestWithoutPayload("delete", url);
    }

    return result;
  };

  getPins = async (): AwaitedResult<IPins> => {
    let result = new AOResult<IPins>();

    if (this.credentials) {
      result = await requestWithoutPayload<IPins>(
        "get",
        createUrlWithAuth("pins.json", this.credentials),
        createFirebaseRequestConfig()
      );
    }

    return result;
  };
}

export default new PinsService();
