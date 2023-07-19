import { FirebaseConfig } from "../../config";
import { signInWithEmailResponseToCredentials } from "../../helpers";
import { AOResult } from "../../helpers/AOResult";
import { AwaitedResult } from "../../helpers/AOResult/types";

import {
  ICredentials,
  ISignInWithEmailPayload,
  ISignInWithEmailResponse,
  ISignUpWithEmailPayload,
  ISignUpWithEmailResponse,
} from "../../types";
import { requestWithPayload } from "../../utils";

const GOOGLE_IDENTITY_TOOLKIT_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:";

export const LOGIN_WITH_EMAIL_URL =
  GOOGLE_IDENTITY_TOOLKIT_URL +
  "signInWithPassword?key=" +
  FirebaseConfig.apiKey;

export const REGISTER_WITH_EMAIL_URL =
  GOOGLE_IDENTITY_TOOLKIT_URL + "signUp?key=" + FirebaseConfig.apiKey;

class AuthService {
  registerWithEmail = async (
    email: string,
    password: string
  ): AwaitedResult<ISignUpWithEmailResponse> => {
    const payload: ISignUpWithEmailPayload = {
      email,
      password,
      returnSecureToken: true,
    };

    return requestWithPayload<
      ISignUpWithEmailPayload,
      ISignUpWithEmailResponse
    >("post", REGISTER_WITH_EMAIL_URL, payload);
  };

  loginWithEmail = async (
    email: string,
    password: string
  ): AwaitedResult<ICredentials | undefined> => {
    const payload: ISignInWithEmailPayload = {
      email,
      password,
      returnSecureToken: true,
    };

    const requestResult = await requestWithPayload<
      ISignInWithEmailPayload,
      ISignInWithEmailResponse
    >("post", LOGIN_WITH_EMAIL_URL, payload);

    let result = new AOResult<ICredentials>();

    if (requestResult.isSuccess && requestResult.data) {
      result = requestResult.convertTo<ICredentials>(
        signInWithEmailResponseToCredentials(requestResult.data)
      );
    }

    return result;
  };
}

export default new AuthService();
