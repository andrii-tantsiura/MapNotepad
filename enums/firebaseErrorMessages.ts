export enum FirebaseErrorMessages {
  USER_NOT_FOUND = "auth/user-not-found",
  EMAIL_ALREADY_IN_USE = "auth/email-already-in-use",
  INVALID_PASSWORD = "auth/invalid-password",
  WRONG_PASSWORD = "auth/wrong-password",

  INVALID_ID_TOKEN = "auth/invalid-id-token",
  ID_TOKEN_EXPIRED = "auth/id-token-expired",
  ID_TOKEN_REVOKED = "auth/id-token-revoked",

  OPERATION_NOT_ALLOWED = "auth/operation-not-allowed",
  INTERNAL_ERROR = "auth/internal-error",
  TOO_MANY_REQUESTS = "auth/too-many-requests",
  NETWORK_REQUEST_FAILED = "auth/network-request-failed",
}
