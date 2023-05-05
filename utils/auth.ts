import {
  ISignUpWithEmailPayload,
  ISignInWithEmailPayload,
  ISignUpWithEmailResponse,
  ISignInWithEmailResponse,
  LoginResult,
} from "../types/auth";
import { getEnumValue } from "./getEnumValue";
import { FirebaseAuthErrorMessages } from "../enums/firebaseAuthErrorMessages";
import { FIREBASE_API_KEY, post } from "../api/post";

const AUTH_BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const SIGN_UP_MODE = "signUp";
const SING_IN_MODE = "signInWithPassword";

export const createUserWithEmail = async (
  email: string,
  password: string
): Promise<LoginResult> => {
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

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<LoginResult> => {
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
