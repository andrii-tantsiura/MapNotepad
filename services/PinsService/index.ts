import { AwaitedResult } from "../../helpers/AOResult/types";
import { ICreatePinResponse, IPin, IPinPayload, IPins } from "../../types";
import { createFirebaseRequestConfig } from "../../utils";
import ApiService from "../ApiService";
import AuthenticatedFirebaseService from "../AuthenticatedService";

class PinsService extends AuthenticatedFirebaseService {
  createPin = async (pin: IPinPayload): AwaitedResult<string> =>
    this.executeAuthenticatedRequest(async (credentials) => {
      const result = await ApiService.request<ICreatePinResponse, IPinPayload>(
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

      const requestResult = await ApiService.request<
        ICreatePinResponse,
        IPinPayload
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

      return ApiService.request("delete", url);
    });

  getPins = async (): AwaitedResult<IPins> =>
    this.executeAuthenticatedRequest(async (credentials) => {
      return ApiService.request<IPins>(
        "get",
        this.createAuthenticatedUrl("pins.json", credentials),
        createFirebaseRequestConfig()
      );
    });
}

export default new PinsService();
