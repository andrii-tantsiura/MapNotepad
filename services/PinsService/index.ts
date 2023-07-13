import { FIREBASE_DATABASE_API_URL } from "../../config";
import { AOResult } from "../../helpers/AOResult";
import { ICreatePinPayload, ICreatePinResponse } from "../../types";
import { postToFirebase } from "../../utils";

class PinsService {
  createPin = (
    pin: ICreatePinPayload
  ): Promise<AOResult<ICreatePinResponse>> => {
    return postToFirebase<ICreatePinPayload, ICreatePinResponse>(
      FIREBASE_DATABASE_API_URL + "/pins.json",
      pin
    );
  };
}

export default new PinsService();
