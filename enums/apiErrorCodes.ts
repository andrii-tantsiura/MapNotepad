import { ApiErrorMessages } from "./apiMessages";

export enum ApiErrorCodes {
  OPERATION_NOT_ALLOWED = ApiErrorMessages.OPERATION_NOT_ALLOWED,
  TOO_MANY_ATTEMPTS_TRY_LATER = ApiErrorMessages.TOO_MANY_ATTEMPTS_TRY_LATER,

  TOKEN_EXPIRED = ApiErrorMessages.TOKEN_EXPIRED,
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN = ApiErrorMessages.CREDENTIAL_TOO_OLD_LOGIN_AGAIN,
  INVALID_REFRESH_TOKEN = ApiErrorMessages.INVALID_REFRESH_TOKEN,

  USER_DISABLED = ApiErrorMessages.USER_DISABLED,
  USER_NOT_FOUND = ApiErrorMessages.USER_NOT_FOUND,

  MISSING_EMAIL = ApiErrorMessages.MISSING_EMAIL,
  INVALID_EMAIL = ApiErrorMessages.INVALID_EMAIL,
  EMAIL_NOT_FOUND = ApiErrorMessages.EMAIL_NOT_FOUND,
  EMAIL_EXISTS = ApiErrorMessages.EMAIL_EXISTS,

  INVALID_PASSWORD = ApiErrorMessages.INVALID_PASSWORD,
  WEAK_PASSWORD = ApiErrorMessages.WEAK_PASSWORD,
  EXPIRED_OOB_CODE = ApiErrorMessages.EXPIRED_OOB_CODE,
}