// import { FIREBASE_API_KEY } from "../api/post";
import { AOResult } from "../../helpers/AOResult";
import { IPinPayload } from "../../types/map";
import { postModelToFirebase } from "../../utils";

class PinsService {
  createPin = (pin: IPinPayload): Promise<AOResult<string>> => {
    return postModelToFirebase<IPinPayload>("/pins.json", pin);
  };
}

export default new PinsService();
