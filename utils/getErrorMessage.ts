import { ApiErrorCodes } from "../enums/apiErrorCodes";

export const getErrorMessage = (errorCode: string): string => {
  const key = errorCode as keyof typeof ApiErrorCodes;
  const message = ApiErrorCodes[key];

  return message ?? errorCode ?? "Something went wrong";
};
