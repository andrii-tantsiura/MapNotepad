export interface AuthErrorResponse {
  error: {
    // code: number;
    // errors: AuthErrorDetail[];
    message: string;
  };
}

// export interface AuthErrorDetail {
//   [key: string]: string;
// }

export interface ISignUpWithEmailPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface ISignInWithEmailPayload extends ISignUpWithEmailPayload {}

export interface ISignUpWithEmailResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface ISignInWithEmailResponse extends ISignUpWithEmailResponse {
  registered: boolean;
}