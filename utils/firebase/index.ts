import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { IBaseModel } from "../../types";
import { AOResult } from "../../helpers/AOResult";
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

export const clarifyAOResultError = <T>(result: AOResult<T>): void => {
  const { exception } = result;
  let message: string | undefined;

  if (axios.isAxiosError(exception) && exception.response) {
    const { status } = exception.response;

    if (status === 400) {
      if (exception.response.data) {
        message = (exception.response.data as FirebaseError).error.message;
      }
    } else if (status === 401) {
      if (exception.response?.data?.error) {
        message = (exception.response.data as UnauthorizedError).error;
      }
    }
  } else {
    message = exception.message;
  }

  result.setFailure(message ?? "Unknown error");
};
