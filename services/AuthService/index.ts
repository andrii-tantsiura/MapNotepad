import { FIREBASE_API_KEY } from "../../config";
import { signInWithEmailResponseToCredentialsModel } from "../../converters";
import { AsyncResult } from "../../helpers/AOResult/types";
import {
  ISignInWithEmailPayload,
  ISignInWithEmailResponse,
  ISignUpWithEmailPayload,
  ISignUpWithEmailResponse,
} from "../../types/api/firebase";
import { ICredentialsModel } from "../../types/models";
import { extractErrorMessageIfFailure } from "../../helpers";
import ApiService from "../ApiService";

const GOOGLE_IDENTITY_TOOLKIT_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:";

const LOGIN_WITH_EMAIL_URL =
  GOOGLE_IDENTITY_TOOLKIT_URL + "signInWithPassword?key=" + FIREBASE_API_KEY;

const REGISTER_WITH_EMAIL_URL =
  GOOGLE_IDENTITY_TOOLKIT_URL + "signUp?key=" + FIREBASE_API_KEY;

class AuthService {
  registerWithEmail = async (
    email: string,
    password: string
  ): AsyncResult<void> => {
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

    return requestResult.convertTo();
  };

  loginWithEmail = async (
    email: string,
    password: string
  ): AsyncResult<ICredentialsModel | undefined> => {
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
      ? signInWithEmailResponseToCredentialsModel(requestResult.data)
      : undefined;

    return requestResult.convertTo<ICredentialsModel>(credentials);
  };
}

export default new AuthService();
