import { FirebaseConfig } from "../../config";
import { AOResult } from "../../helpers/AOResult";
import { AwaitedResult } from "../../helpers/AOResult/types";
import { ICredentials } from "../../types";

class AuthenticatedService {
  public credentials: ICredentials | null = null;

  executeAuthenticatedRequest = async <TResult>(
    request: (credentials: ICredentials) => AwaitedResult<TResult>
  ) => {
    let result = new AOResult<TResult>();

    if (this.credentials) {
      result = await request(this.credentials);
    }

    return result;
  };

  createAuthenticatedUrl = (path: string, { idToken, userId }: ICredentials) =>
    `${FirebaseConfig.realtimeDbUrl}/${userId}/${path}?auth=${idToken}`;
}

export default AuthenticatedService;
