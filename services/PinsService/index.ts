import { AwaitedResult } from "../../helpers/AOResult/types";
import { ICreatePinResponse, IPin, IPinPayload, IPins } from "../../types";
import {
  createFirebaseRequestConfig,
  requestWithPayload,
  requestWithoutPayload,
} from "../../utils";
import AuthenticatedService from "../AuthenticatedService";

class PinsService extends AuthenticatedService {
  createPin = async (pin: IPinPayload): AwaitedResult<string> =>
    this.executeAuthenticatedRequest(async (credentials) => {
      const result = await requestWithPayload<IPinPayload, ICreatePinResponse>(
        "post",
        this.createAuthenticatedUrl("pins.json", credentials),
        pin
      );

      return result.convertTo<string>(result.data?.name);
    });

  updatePin = async (pin: IPin): AwaitedResult<boolean> =>
    this.executeAuthenticatedRequest(async (credentials) => {
      const { id, ...restFields } = pin;
      const payload: IPinPayload = { ...restFields };

      const url = this.createAuthenticatedUrl(`pins/${id}.json`, credentials);

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
    this.executeAuthenticatedRequest(async (credentials) => {
      const url = this.createAuthenticatedUrl(
        `pins/${pinId}.json`,
        credentials
      );

      return requestWithoutPayload("delete", url);
    });

  getPins = async (): AwaitedResult<IPins> =>
    this.executeAuthenticatedRequest(async (credentials) => {
      return requestWithoutPayload<IPins>(
        "get",
        this.createAuthenticatedUrl("pins.json", credentials),
        createFirebaseRequestConfig()
      );
    });
}

export default new PinsService();
