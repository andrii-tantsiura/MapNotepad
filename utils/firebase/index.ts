import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { HttpCodes } from "../../enums";
import { ExtractErrorMessage } from "../../helpers/AOResult/types";
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

export const extractErrorMessage: ExtractErrorMessage = (
  exception: any
): string | undefined => {
  let errorMessage: string | undefined;

  if (axios.isAxiosError(exception) && exception.response) {
    const { status, data } = exception.response;

    switch (status as HttpCodes) {
      case HttpCodes.BAD_REQUEST:
        if (data) {
          errorMessage = (data as FirebaseError).error.message;
        }
        break;

      case HttpCodes.UNAUTHORIZED:
        if (data) {
          if (data?.error) {
            errorMessage = (data as UnauthorizedError).error;
          } else {
            errorMessage = data;
          }
        }
        break;

      default:
        errorMessage = data;
        break;
    }
  } else {
    errorMessage = exception.message;
  }

  return errorMessage;
};
