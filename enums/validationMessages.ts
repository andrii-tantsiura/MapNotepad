export enum ValidationErrorMessagesEnum {
  REQUIRED = "This field is required",
  USERNAME_INVALID = "The name must start with a letter, contain only uppercase or lowercase letters and numbers, as well as a dash symbol.",
  USERNAME_LENGTH_INVALID = "Names must be between 2 and 50 characters long",
  EMAIL_INVALID = "Email is invalid",
  SHORT_PASSWORD = "The password must consist of at least 8 characters",
  PASSWORD_MISMATCH = "Password mismatch",
  PASSWORD_INVALID = "The password must contain at least one capital letter, one lowercase letter, one digit and one special character",
  // TODO: add additional hints to the password
  // PASSWORD_MUST_CONTAIN_SPECIAL_CHAR = "The password must contain at least one special character",
  // PASSWORD_MUST_CONTAIN_DIGIT = "Password should have at least one digit",
  // PASSWORD_MUST_CONTAIN_UPPERCASE_LETTER = "The password must contain at least one uppercase letter",
  // PASSWORD_MUST_CONTAIN_LOWERCASE_LETTER = "The password must contain at least one lowercase letter",
}
