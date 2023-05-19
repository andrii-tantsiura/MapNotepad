import {
  EMAIL_REGEX,
  LATITUDE_REGEX,
  LONGITUDE_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../constants/regexConstants";
import { ValidationErrorMessages } from "../enums/validationMessages";

export const USERNAME_RULES = {
  required: ValidationErrorMessages.REQUIRED,
  minLength: { value: 2, message: ValidationErrorMessages.USERNAME_TOO_SHORT },
  maxLength: { value: 50, message: ValidationErrorMessages.USERNAME_TOO_LONG },
  pattern: {
    value: USERNAME_REGEX,
    message: ValidationErrorMessages.USERNAME_INVALID,
  },
};

export const EMAIL_RULES = {
  required: ValidationErrorMessages.REQUIRED,
  pattern: {
    value: EMAIL_REGEX,
    message: ValidationErrorMessages.EMAIL_INVALID,
  },
};

export const PASSWORD_RULES = {
  required: ValidationErrorMessages.REQUIRED,
  minLength: { value: 8, message: ValidationErrorMessages.PASSWORD_TOO_SHORT },
  pattern: {
    value: PASSWORD_REGEX,
    message: ValidationErrorMessages.PASSWORD_INVALID,
  },
};

export const CONFIRM_PASSWORD_RULES = {
  required: ValidationErrorMessages.REQUIRED,
  validate: {
    value: PASSWORD_REGEX,
    message: ValidationErrorMessages.PASSWORD_MISMATCH,
  },
};

export const PIN_LABEL_RULES = {
  required: ValidationErrorMessages.REQUIRED,
  minLength: { value: 2, message: ValidationErrorMessages.PIN_LABEL_TOO_SHORT },
  maxLength: { value: 40, message: ValidationErrorMessages.PIN_LABEL_TOO_LONG },
};

export const LONGITUDE_RULES = {
  required: ValidationErrorMessages.REQUIRED,
  pattern: {
    value: LONGITUDE_REGEX,
    message: "Incorrect format",
  },
};

export const LATITUDE_RULES = {
  required: ValidationErrorMessages.REQUIRED,
  pattern: {
    value: LATITUDE_REGEX,
    message: "Incorrect format",
  },
};
