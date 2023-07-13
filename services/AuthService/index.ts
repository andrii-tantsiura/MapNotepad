// import { FIREBASE_API_KEY } from "../api/post";
import { AOResult } from "../../helpers/AOResult";
import {
  ISignInWithEmailPayload,
  ISignInWithEmailResponse,
  ISignUpWithEmailPayload,
  ISignUpWithEmailResponse,
} from "../../types/firebase";
import { postToFirebase } from "../../utils";
import {
  LOGIN_WITH_EMAIL_URL,
  REGISTER_WITH_EMAIL_URL,
} from "../../utils/firebase/constants";

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
