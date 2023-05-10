import * as Yup from "yup";
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  LONGITUDE_REGEX,
  LATITUDE_REGEX,
} from "../constants/regexConstants";
import { ValidationErrorMessages as ErrorMessage } from "../enums/validationMessages";

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
  .min(8, ErrorMessage.PASSWORD_SHORTER_THAN_8_CHARS)
  .matches(PASSWORD_REGEX, ErrorMessage.PASSWORD_INVALID);

export const confirmPasswordValidationSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .oneOf([Yup.ref("password")], ErrorMessage.PASSWORD_MISMATCH);

export const longitudeValidationSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .matches(LONGITUDE_REGEX, ErrorMessage.LONGITUDE_INVALID);

export const latitudeValidationSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .matches(LATITUDE_REGEX, ErrorMessage.LATITUDE_INVALID);
