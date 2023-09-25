export enum ValidationErrorMessages {
  REQUIRED = "This field is required",

  USERNAME_INVALID = "The name must start with a letter, contain only uppercase or lowercase letters and numbers, as well as a dash symbol.",
  USERNAME_LENGTH_INVALID = "Names must be between 2 and 50 characters long",
  USERNAME_TOO_SHORT = "The name must be longer than 2 characters",
  USERNAME_TOO_LONG = "The name must be less than 50 characters long",

  EMAIL_INVALID = "Wrong Email",

  PASSWORD_TOO_SHORT = "The password must consist of at least 8 characters",
  PASSWORD_MISMATCH = "Password mismatch",
  PASSWORD_INVALID = "The password must contain at least one capital letter, one lowercase letter, one digit and one special character",

  LONGITUDE_INVALID = "Incorrect longitude",
  LATITUDE_INVALID = "Incorrect latitude",
  PIN_LABEL_TOO_SHORT = "The label must be longer than 2 characters",
  PIN_LABEL_TOO_LONG = "The label must be less than 40 characters long",
}
