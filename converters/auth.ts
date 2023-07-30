import { ISignInWithEmailResponse } from "../types/api/firebase";
import { ICredentialsModel } from "../types/models";

export const signInWithEmailResponseToCredentialsModel = (
  data: ISignInWithEmailResponse
): ICredentialsModel => ({
  idToken: data.idToken,
  tokenLifeSpanInSeconds: data.expiresIn,
  refreshToken: data.refreshToken,
  userId: data.localId,
  email: data.email,
});
