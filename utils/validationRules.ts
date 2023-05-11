import { LATITUDE_REGEX, LONGITUDE_REGEX } from "../constants/regexConstants";
import { ValidationErrorMessages } from "../enums/validationMessages";

export const PIN_LABEL_RULES = {
  required: ValidationErrorMessages.REQUIRED,
  minLength: {
    value: 2,
    message: ValidationErrorMessages.TOO_SHORT_PIN_LABEL,
  },
  maxLength: {
    value: 40,
    message: ValidationErrorMessages.TOO_LONG_PIN_LABEL,
  },
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
