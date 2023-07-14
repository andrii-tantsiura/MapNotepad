import { LatLng } from "react-native-maps";

import { IPin } from "./map";

export interface IError {
  [key: string]: string;
}

export interface IErrorResponse {
  error: {
    code: number;
    errors: IError[];
    message: string;
  };
}

export interface ISignUpWithEmailPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface ISignInWithEmailPayload extends ISignUpWithEmailPayload {}

export interface ISignUpWithEmailResponse extends IErrorResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface ISignInWithEmailResponse extends ISignUpWithEmailResponse {
  registered: boolean;
}

export interface ILoginResult {
  idToken?: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface ICreatePinResponse extends IErrorResponse {
  name: string;
}

export interface IPinPayload {
  location: LatLng;
  label: string;
  description?: string;
  isFavorite?: boolean;
}

export interface IPinsResponse extends IErrorResponse {
  pins: IPin[];
}
