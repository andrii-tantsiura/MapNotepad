import axios from "axios";

import { FirebaseError, UnauthorizedError } from "./types";

export const requestExceptionToMessage = (exception: any): string => {
  let message: string | undefined;

  if (axios.isAxiosError(exception) && exception.response) {
    const { status } = exception.response;

    if (status === 400) {
      if (exception.response.data) {
        const error: FirebaseError = exception.response.data;

        console.log("Auth error: ", error);

        message = error.error.message;
      }
    } else if (status === 401) {
      if (exception.response?.data?.error) {
        const error: UnauthorizedError = exception.response.data;

        console.log("Unauthorized error: ", error);

        message = error.error;
      }
    }
  } else {
    console.log("stock-error", exception.message);

    message = exception.message;
  }

  return message ?? "Unknown error";
};
