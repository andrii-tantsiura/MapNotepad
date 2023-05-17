export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-]+$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const LATITUDE_REGEX = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/;
export const LONGITUDE_REGEX = /^-?([1-9]|[1-9]\d|1[0-7]\d)\.{1}\d{1,6}/;
