export enum FirebaseAuthErrorCodes {
  OPERATION_NOT_ALLOWED = "OPERATION_NOT_ALLOWED",
  TOO_MANY_ATTEMPTS_TRY_LATER = "TOO_MANY_ATTEMPTS_TRY_LATER",

  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN = "CREDENTIAL_TOO_OLD_LOGIN_AGAIN",
  INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN",

  USER_DISABLED = "USER_DISABLED",
  USER_NOT_FOUND = "USER_NOT_FOUND",

  MISSING_EMAIL = "MISSING_EMAIL",
  INVALID_EMAIL = "INVALID_EMAIL",
  EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
  EMAIL_EXISTS = "EMAIL_EXISTS",

  INVALID_PASSWORD = "INVALID_PASSWORD",
  WEAK_PASSWORD = "WEAK_PASSWORD",
  EXPIRED_OOB_CODE = "EXPIRED_OOB_CODE",
}
