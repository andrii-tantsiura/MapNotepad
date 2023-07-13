import { FIREBASE_API_KEY, FIREBASE_AUTH_API_URL } from "../../config";
import { AOResult } from "../../helpers/AOResult";
import {
  ISignInWithEmailPayload,
  ISignInWithEmailResponse,
  ISignUpWithEmailPayload,
  ISignUpWithEmailResponse,
} from "../../types";
import { postToFirebase } from "../../utils";

export const LOGIN_WITH_EMAIL_URL =
  FIREBASE_AUTH_API_URL + "signInWithPassword?key=" + FIREBASE_API_KEY;

export const REGISTER_WITH_EMAIL_URL =
  FIREBASE_AUTH_API_URL + "signUp?key=" + FIREBASE_API_KEY;

class AuthService {
  registerWithEmail = async (
    email: string,
    password: string
  ): Promise<AOResult<ISignUpWithEmailResponse>> => {
    const payload: ISignUpWithEmailPayload = {
      email,
      password,
      returnSecureToken: true,
    };

    return postToFirebase<ISignUpWithEmailPayload, ISignUpWithEmailResponse>(
      REGISTER_WITH_EMAIL_URL,
      payload
    );
  };

  loginWithEmail = async (
    email: string,
    password: string
  ): Promise<AOResult<ISignInWithEmailResponse>> => {
    const payload: ISignInWithEmailPayload = {
      email,
      password,
      returnSecureToken: true,
    };

    return postToFirebase<ISignInWithEmailPayload, ISignInWithEmailResponse>(
      LOGIN_WITH_EMAIL_URL,
      payload
    );
  };
}

export default new AuthService();
