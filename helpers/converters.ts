import { ICredentials, ISignInWithEmailResponse } from "../types";

export const signInWithEmailResponseToCredentials = (
  data: ISignInWithEmailResponse
): ICredentials => ({
  idToken: data.idToken,
  tokenLifeSpanInSeconds: data.expiresIn,
  refreshToken: data.refreshToken,
  userId: data.localId,
  email: data.email,
});

export const textToKeywords = (text: string) =>
  text
    ?.trim()
    .toLowerCase()
    .split(/[\s,]+/)
    .map((key) => key.trim());
