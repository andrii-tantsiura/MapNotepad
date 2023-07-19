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

  tryRequestWithCredentials = async <TResult>(
    request: (credentials: ICredentials) => AwaitedResult<TResult>
  ) => {
    let result = new AOResult<TResult>();

    if (this.credentials) {
      result = await request(this.credentials);
    }

    return result;
  };

  createPin = async (pin: IPinPayload): AwaitedResult<string> =>
    this.tryRequestWithCredentials(async (credentials) => {
      const result = await requestWithPayload<IPinPayload, ICreatePinResponse>(
        "post",
        createUrlWithAuth("pins.json", credentials),
        pin
      );

      return result.convertTo<string>(result.data?.name);
    });

  updatePin = async (pin: IPin): AwaitedResult<boolean> =>
    this.tryRequestWithCredentials(async (credentials) => {
      const { id, ...restFields } = pin;
      const payload: IPinPayload = { ...restFields };

      const url = createUrlWithAuth(`pins/${id}.json`, credentials);

      const requestResult = await requestWithPayload<
        IPinPayload,
        ICreatePinResponse
      >("put", url, payload);

      return requestResult.convertTo(Boolean(requestResult.data));
    });

  toggleFavoritePinStatus = async (pin: IPin) => {
    const newPin = { ...pin, isFavorite: !pin.isFavorite };

    return this.updatePin(newPin);
  };

  deletePin = async (pinId: string): AwaitedResult<null> =>
    this.tryRequestWithCredentials(async (credentials) => {
      const url = createUrlWithAuth(`pins/${pinId}.json`, credentials);

      return requestWithoutPayload("delete", url);
    });

  getPins = async (): AwaitedResult<IPins> =>
    this.tryRequestWithCredentials(async (credentials) => {
      return requestWithoutPayload<IPins>(
        "get",
        createUrlWithAuth("pins.json", credentials),
        createFirebaseRequestConfig()
      );
    });
}

export default new PinsService();
