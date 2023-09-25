import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseAuth } from "../../FirebaseConfig";
import { extractErrorMessageIfFailure } from "../../helpers";
import { ExecuteAsync } from "../../helpers/AOResult";
import { AsyncResult } from "../../helpers/AOResult/types";
import { ICredentialsModel } from "../../types/models";

class AuthService {
  public registerWithEmail = async (
    email: string,
    password: string
  ): AsyncResult<ICredentialsModel | undefined> => {
    const requestResult = await ExecuteAsync<UserCredential>(async () =>
      createUserWithEmailAndPassword(FirebaseAuth, email, password)
    );

    extractErrorMessageIfFailure(requestResult);

    const credentials = requestResult.data
      ? {
          userId: requestResult.data.user.uid,
        }
      : undefined;

    return requestResult.convertTo<ICredentialsModel>(credentials);
  };

  public loginWithEmail = async (
    email: string,
    password: string
  ): AsyncResult<ICredentialsModel | undefined> => {
    const requestResult = await ExecuteAsync<UserCredential>(async () =>
      signInWithEmailAndPassword(FirebaseAuth, email, password)
    );

    extractErrorMessageIfFailure(requestResult);

    const credentials = requestResult.data
      ? {
          userId: requestResult.data.user.uid,
        }
      : undefined;

    return requestResult.convertTo<ICredentialsModel>(credentials);
  };
}

export default new AuthService();
