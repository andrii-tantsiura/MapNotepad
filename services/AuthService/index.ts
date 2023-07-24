import { FirebaseConfig } from "../../config";
import { signInWithEmailResponseToCredentials } from "../../helpers";
import { AwaitedResult } from "../../helpers/AOResult/types";

import {
  ICredentials,
  ISignInWithEmailPayload,
  ISignInWithEmailResponse,
  ISignUpWithEmailPayload,
  ISignUpWithEmailResponse,
} from "../../types";
import { extractErrorMessageIfFailure } from "../../utils";
import ApiService from "../ApiService";

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

    const requestResult = await ApiService.request<
      ISignUpWithEmailResponse,
      ISignUpWithEmailPayload
    >("post", REGISTER_WITH_EMAIL_URL, payload);

    extractErrorMessageIfFailure(requestResult);

    return requestResult;
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

    const requestResult = await ApiService.request<
      ISignInWithEmailResponse,
      ISignInWithEmailPayload
    >("post", LOGIN_WITH_EMAIL_URL, payload);

    extractErrorMessageIfFailure(requestResult);

    const credentials = requestResult.data
      ? signInWithEmailResponseToCredentials(requestResult.data)
      : undefined;

    return requestResult.convertTo<ICredentials>(credentials);
  };
}

export default new AuthService();
