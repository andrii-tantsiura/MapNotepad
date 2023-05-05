import { ApiErrorCodesEnum } from "../enums/apiErrorCodes";

export const getErrorMessage = (errorCode: string): string => {
  const key = errorCode as keyof typeof ApiErrorCodesEnum;
  const message = ApiErrorCodesEnum[key];

  return message ?? errorCode ?? "Something went wrong";
};
