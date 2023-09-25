import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseAuth } from "../../FirebaseConfig";
import { ErrorMessages } from "../../enums";
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

    return requestResult.convertTo<ICredentialsModel>({
      userId: requestResult.data?.user.uid ?? ErrorMessages.UNDEFINED_USER_ID,
    });
  };

  public loginWithEmail = async (
    email: string,
    password: string
  ): AsyncResult<ICredentialsModel | undefined> => {
    const requestResult = await ExecuteAsync<UserCredential>(async () =>
      signInWithEmailAndPassword(FirebaseAuth, email, password)
    );

    return requestResult.convertTo<ICredentialsModel>({
      userId: requestResult.data?.user.uid ?? ErrorMessages.UNDEFINED_USER_ID,
    });
  };
}

export default new AuthService();
