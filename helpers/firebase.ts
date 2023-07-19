import { FIREBASE_DATABASE_API_URL } from "../config";
import { ICredentials } from "../types";

export const createUrlWithAuth = (
  path: string,
  { idToken, userId }: ICredentials
) => `${FIREBASE_DATABASE_API_URL}/${userId}/${path}?auth=${idToken}`;
