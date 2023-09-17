import { ISignInWithEmailResponse } from "../types/api/firebase";
import { ICredentialsModel } from "../types/models";

export const signInWithEmailResponseToCredentialsModel = (
  data: ISignInWithEmailResponse
): ICredentialsModel => ({
  token: data.idToken,
  expirationDate: data.expiresIn,
  refreshToken: data.refreshToken,
  userId: data.localId,
});
