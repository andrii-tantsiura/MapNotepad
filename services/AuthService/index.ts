import { FIREBASE_API_KEY, FIREBASE_AUTH_API_URL } from "../../config";
import { AwaitedResult } from "../../helpers/AOResult/types";

import {
  ICredentials,
  ISignInWithEmailPayload,
  ISignInWithEmailResponse,
  ISignUpWithEmailPayload,
  ISignUpWithEmailResponse,
} from "../../types";
import { requestWithPayload } from "../../utils";

export const LOGIN_WITH_EMAIL_URL =
  FIREBASE_AUTH_API_URL + "signInWithPassword?key=" + FIREBASE_API_KEY;

export const REGISTER_WITH_EMAIL_URL =
  FIREBASE_AUTH_API_URL + "signUp?key=" + FIREBASE_API_KEY;

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

    const result = await requestWithPayload<
      ISignInWithEmailPayload,
      ISignInWithEmailResponse
    >("post", LOGIN_WITH_EMAIL_URL, payload);

    return result.data
      ? result.convertTo<ICredentials>({
          idToken: result.data?.idToken,
          expirationDate: result.data.expiresIn,
          refreshToken: result.data.refreshToken,
          userId: result.data.localId,
          email: result.data.email,
        })
      : result.convertTo();
  };
}

export default new AuthService();
