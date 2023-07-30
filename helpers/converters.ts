import {
  ICredentials,
  IPin,
  IPinForm,
  ISignInWithEmailResponse,
} from "../types";

export const pinFormToPin = ({
  label,
  description,
  latitude,
  longitude,
}: IPinForm): IPin => ({
  id: "",
  label,
  description,
  location: {
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  },
  isFavorite: true,
});

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
