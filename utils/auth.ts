import axios, { AxiosError } from "axios";
import {
  ISignUpWithEmailPayload,
  ISignInWithEmailPayload,
  ISignUpWithEmailResponse,
  ISignInWithEmailResponse,
  AuthErrorResponse,
} from "../types/auth";

const FIREBASE_API_KEY = "AIzaSyDNrzSTY0ZRPpfmSzqgMWl95weevrmh-cw";
const AUTH_BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const SIGN_UP_MODE = "signUp";
const SING_IN_MODE = "signInWithPassword";

const post = async <TPayload, TResponse>(url: string, payload: TPayload) => {
  let errorCode: string | undefined;
  let data: TResponse | undefined;
  await axios
    .post<TPayload>(url, payload)
    .then((res) => {
      data = res.data as unknown as TResponse;
    })
    .catch((error: AxiosError<AuthErrorResponse>) => {
      errorCode = error.response?.data.error.message;
    });

  return { data, errorCode };
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

  errorCode && console.log("createUserWithEmail", errorCode);

  return { idToken: data?.idToken, errorCode };
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

  errorCode && console.log("loginWithEmail", errorCode);

  return { idToken: data?.idToken, errorCode };
};
