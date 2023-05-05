import * as Yup from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/regexContants";
import { ValidationErrorMessages } from "../enums/validationMessages";

export const nameValidationSchema = Yup.string()
  .required(ValidationErrorMessages.REQUIRED)
  .min(2, ValidationErrorMessages.NAME_LENGTH_INVALID)
  .max(50, ValidationErrorMessages.NAME_LENGTH_INVALID);

export const emailValidationSchema = Yup.string()
  .required(ValidationErrorMessages.REQUIRED)
  .matches(EMAIL_REGEX, ValidationErrorMessages.EMAIL_INVALID);

export const passwordValidationSchema = Yup.string()
  .required(ValidationErrorMessages.REQUIRED)
  .min(8, ValidationErrorMessages.SHORT_PASSWORD)
  .matches(PASSWORD_REGEX, ValidationErrorMessages.PASSWORD_INVALID);

export const confirmPasswordValidationSchema = Yup.string()
  .required(ValidationErrorMessages.REQUIRED)
  .oneOf([Yup.ref("password")], ValidationErrorMessages.PASSWORD_MISMATCH);
