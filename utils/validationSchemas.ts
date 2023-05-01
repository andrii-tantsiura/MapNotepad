import * as Yup from "yup";

export const nameValidationSchema = Yup.string()
  .required("Please enter your name.")
  .min(2, "Too Short!")
  .max(50, "Too Long!");

export const emailValidationSchema = Yup.string()
  .required("Please enter your email address.")
  .email("Invalid email");

export const passwordValidationSchema = Yup.string()
  .required("Please enter your password.")
  .min(8)
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
  );

export const confirmPasswordValidationSchema = Yup.string()
  .required("Please repeat your password.")
  .oneOf([Yup.ref("password")], "Passwords mismatch");
