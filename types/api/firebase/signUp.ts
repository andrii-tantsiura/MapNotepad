export interface ISignUpWithEmailPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface ISignUpWithEmailResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
