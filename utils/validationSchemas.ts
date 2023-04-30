import * as Yup from "yup";

export const nameValidationSchema = Yup.string()
  .min(2, "Too Short!")
  .max(50, "Too Long!")
  .required("Please enter your name.");

export const emailValidationSchema = Yup.string()
  .email("Invalid email")
  .required("Please enter your email address.");
