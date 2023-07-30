import { ISignUpWithEmailPayload, ISignUpWithEmailResponse } from "./signUp";

export interface ISignInWithEmailPayload extends ISignUpWithEmailPayload {}

export interface ISignInWithEmailResponse extends ISignUpWithEmailResponse {
  displayName: string;
  registered: boolean;
}
