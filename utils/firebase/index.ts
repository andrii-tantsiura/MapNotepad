import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { AOResult } from "../../helpers/AOResult";
import { IBaseModel } from "../../types";
import { FirebaseError, UnauthorizedError } from "./types";

interface IModels {
  [index: string]: IBaseModel;
}

function withFirebaseModelsToArray<T>(
  reviver?: (key: string, value: any) => any
) {
  return function (response: AxiosResponse): Array<T> {
    const models = JSON.parse(String(response), reviver) as IModels;
    const array: Array<T> = [];

    for (const key in models) {
      models[key].id = key;

      array.push(models[key] as T);
    }

    return array;
  };
}

export const createFirebaseRequestConfig = <T>(
  reviver?: (key: string, value: any) => any
): AxiosRequestConfig => ({
  transformResponse: withFirebaseModelsToArray<T>(reviver),
});

export const extractErrorMessageIfFailure = <T>(result: AOResult<T>): void => {
  if (!result.isSuccess) {
    const exception = result.exception;
    let errorMessage: string | undefined;

    if (axios.isAxiosError(exception) && exception.response) {
      const { data } = exception.response;

      errorMessage =
        (data as FirebaseError).error?.message ??
        (data as UnauthorizedError).error ??
        (data as any[])[0];
    } else {
      errorMessage = exception.message;
    }

    errorMessage = errorMessage as string;

    if (errorMessage) {
      result.setFailure(errorMessage);
    }
  }
};
