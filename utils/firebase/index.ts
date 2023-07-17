import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { IBaseModel } from "../../types";
import { AOResult } from "../../helpers/AOResult";
import { FirebaseError, UnauthorizedError } from "./types";
import { ExtractErrorMessage } from "../../helpers/AOResult/types";

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

export const extractErrorMessage: ExtractErrorMessage = (
  exception: any
): string | undefined => {
  let message: string | undefined;

  if (axios.isAxiosError(exception) && exception.response) {
    const { status, data } = exception.response;

    if (status === 400) {
      if (data) {
        message = (data as FirebaseError).error.message;
      }
    } else if (status === 401) {
      if (data?.error) {
        message = (data as UnauthorizedError).error;
      }
    }
  } else {
    message = exception.message;
  }

  return message;
};
