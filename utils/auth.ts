import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ISignUpWithEmailPayload,
  ISignInWithEmailPayload,
  ISignUpWithEmailResponse,
  ISignInWithEmailResponse,
  AuthErrorResponse,
} from "../types/auth";
import { getEnumValue } from "./getEnumValue";
import { FirebaseAuthErrorMessages } from "../enums/firebaseAuthErrorMessages";

const FIREBASE_API_KEY = "AIzaSyDNrzSTY0ZRPpfmSzqgMWl95weevrmh-cw";
const AUTH_BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const SIGN_UP_MODE = "signUp";
const SING_IN_MODE = "signInWithPassword";

const post = async <TPayload, TResponse>(url: string, payload: TPayload) => {
  let errorCode: string | unknown;
  let data: TResponse | unknown;

  try {
    const response = await axios.post<TPayload, AxiosResponse<TResponse>>(
      url,
      payload
    );

    data = response.data;
    // @ts-ignore
  } catch (error: AxiosError<AuthErrorResponse>) {
    errorCode = error.response?.data.error.message;
  }

  return { data: data as TResponse, errorCode: errorCode as string };
};

export const createUserWithEmail = async (email: string, password: string) => {
  const url = `${AUTH_BASE_URL}${SIGN_UP_MODE}?key=` + FIREBASE_API_KEY;

  const payload: ISignUpWithEmailPayload = {
    email,
    password,
    returnSecureToken: true,
  };

  const { data, errorCode } = await post<
    ISignUpWithEmailPayload,
    ISignUpWithEmailResponse
  >(url, payload);

  const errorMessage = getEnumValue(FirebaseAuthErrorMessages, errorCode);

  return { idToken: data?.idToken, errorCode, errorMessage };
};

export const loginWithEmail = async (email: string, password: string) => {
  const url = `${AUTH_BASE_URL}${SING_IN_MODE}?key=` + FIREBASE_API_KEY;

  const payload: ISignInWithEmailPayload = {
    email,
    password,
    returnSecureToken: true,
  };

  const { data, errorCode } = await post<
    ISignInWithEmailPayload,
    ISignInWithEmailResponse
  >(url, payload);

  const errorMessage = getEnumValue(FirebaseAuthErrorMessages, errorCode);

  return { idToken: data?.idToken, errorCode, errorMessage };
};
