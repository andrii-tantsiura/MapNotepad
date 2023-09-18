import {
  ISignInWithEmailResponse,
  ISignUpWithEmailResponse,
} from "../types/api/firebase";
import { ICredentialsModel } from "../types/models";

export const signInWithEmailResponseToCredentialsModel = (
  data: ISignInWithEmailResponse
): ICredentialsModel => ({
  token: data.idToken,
  expirationDate: data.expiresIn,
  refreshToken: data.refreshToken,
  userId: data.localId,
});

export const signUpWithEmailResponseToCredentialsModel = (
  data: ISignUpWithEmailResponse
): ICredentialsModel => ({
  token: data.idToken,
  expirationDate: data.expiresIn,
  refreshToken: data.refreshToken,
  userId: data.localId,
});
