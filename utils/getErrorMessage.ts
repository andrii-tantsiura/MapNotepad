enum ErrorCodes {
  EMAIL_EXISTS = "Email exists",
  OPERATION_NOT_ALLOWED = "Operation not allowed",
  TOO_MANY_ATTEMPTS_TRY_LATER = "Too many attempts, try later",
  INVALID_EMAIL = "Invalid email",
  INVALID_PASSWORD = "Invalid password",
  MISSING_EMAIL = "Missing email",
  EMAIL_NOT_FOUND = "Email not found",
}

export const getErrorMessage = (errorCode: string): string => {
  const key = errorCode as keyof typeof ErrorCodes;
  const message = ErrorCodes[key];

  return message ?? "Something went wrong";
};
