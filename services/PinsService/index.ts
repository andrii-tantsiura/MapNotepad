import { FIREBASE_DATABASE_API_URL } from "../../config";
import { AOResult } from "../../helpers/AOResult";
import { ICreatePinPayload, ICreatePinResponse, IPin } from "../../types";
import { getArrayFromFirebase, postToFirebase } from "../../utils";

class PinsService {
  createPin = async (
    pin: ICreatePinPayload
  ): Promise<AOResult<ICreatePinResponse>> => {
    return postToFirebase<ICreatePinPayload, ICreatePinResponse>(
      FIREBASE_DATABASE_API_URL + "/pins.json",
      pin
    );
  };

  getPins = async () => {
    return getArrayFromFirebase<IPin>("/pins.json");
  };
}

export default new PinsService();
