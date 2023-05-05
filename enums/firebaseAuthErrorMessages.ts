export enum FirebaseAuthErrorMessages {
  OPERATION_NOT_ALLOWED = "Operation not allowed",
  TOO_MANY_ATTEMPTS_TRY_LATER = "Too many attempts, try later",

  TOKEN_EXPIRED = "Token expired",
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN = "The user's credential is no longer valid. The user must sign in again",
  INVALID_REFRESH_TOKEN = "Invalid refresh token",

  USER_DISABLED = "User disabled",
  USER_NOT_FOUND = "User not found",

  MISSING_EMAIL = "Missing email",
  INVALID_EMAIL = "Invalid email",
  EMAIL_NOT_FOUND = "Email is not registered",
  EMAIL_EXISTS = "Email already registered",

  INVALID_PASSWORD = "Invalid password",
  WEAK_PASSWORD = "Weak password",
  EXPIRED_OOB_CODE = "Expired OOB code",
}
