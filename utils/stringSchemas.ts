import * as Yup from "yup";
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  LONGITUDE_REGEX,
  LATITUDE_REGEX,
} from "../constants/regexConstants";
import { ValidationErrorMessages as ErrorMessage } from "../enums/validationMessages";

const nameSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .min(2, ErrorMessage.USERNAME_LENGTH_INVALID)
  .max(50, ErrorMessage.USERNAME_LENGTH_INVALID)
  .matches(USERNAME_REGEX, ErrorMessage.USERNAME_INVALID);

const emailSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .matches(EMAIL_REGEX, ErrorMessage.EMAIL_INVALID);

const passwordSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .min(8, ErrorMessage.PASSWORD_TOO_SHORT)
  .matches(PASSWORD_REGEX, ErrorMessage.PASSWORD_INVALID);

const confirmPasswordSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .oneOf([Yup.ref("password")], ErrorMessage.PASSWORD_MISMATCH);

const pinLabelSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .min(2, ErrorMessage.PIN_LABEL_TOO_SHORT)
  .max(40, ErrorMessage.PIN_LABEL_TOO_LONG);

const longitudeSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .matches(LONGITUDE_REGEX, ErrorMessage.LONGITUDE_INVALID);

const latitudeSchema = Yup.string()
  .required(ErrorMessage.REQUIRED)
  .matches(LATITUDE_REGEX, ErrorMessage.LATITUDE_INVALID);

export const userValidationSchema = Yup.object().shape({
  name: nameSchema,
  email: emailSchema,
});

export const createPasswordValidationSchema = Yup.object().shape({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export const loginValidationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const pinValidationSchema = Yup.object().shape({
  label: pinLabelSchema,
  longitude: longitudeSchema,
  latitude: latitudeSchema,
});
