import * as Yup from "yup";
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
} from "../constants/regexContants";
import { ValidationErrorMessagesEnum as ErrorMessage } from "../enums/validationMessages";

export const nameValidationSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .min(2, ErrorMessage.USERNAME_LENGTH_INVALID)
  .max(50, ErrorMessage.USERNAME_LENGTH_INVALID)
  .matches(USERNAME_REGEX, ErrorMessage.USERNAME_INVALID);

export const emailValidationSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .matches(EMAIL_REGEX, ErrorMessage.EMAIL_INVALID);

export const passwordValidationSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .min(8, ErrorMessage.SHORT_PASSWORD)
  .matches(PASSWORD_REGEX, ErrorMessage.PASSWORD_INVALID);

export const confirmPasswordValidationSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .oneOf([Yup.ref("password")], ErrorMessage.PASSWORD_MISMATCH);
