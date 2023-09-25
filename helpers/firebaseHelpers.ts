import axios from "axios";

import {
  IFirebaseNodes,
  ResponseError,
  UnauthorizedResponseError,
} from "../types/api/firebase";
import { AOResult } from "./AOResult";

export const firebaseNodesToArray = <T>(nodes: IFirebaseNodes): Array<T> => {
  const array: T[] = [];

  for (let key in nodes) {
    nodes[key].id = key;

    array.push(nodes[key] as T);
  }

  return array;
};

export const extractErrorMessageIfFailure = <T>(result: AOResult<T>): void => {
  if (!result.isSuccess) {
    const exception = result.exception;
    let errorMessage: string | undefined;

    if (axios.isAxiosError(exception) && exception.response) {
      const { data } = exception.response;

      errorMessage =
        (data as ResponseError).error?.message ??
        (data as UnauthorizedResponseError).error ??
        (data as any[])[0];
    } else {
      errorMessage = exception.code ?? exception.message;
    }

    result.setFailure(errorMessage);
  }
};
