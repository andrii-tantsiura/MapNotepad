import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { ExecuteAsync, FailureCallback } from "../helpers/AOResult";
import { IErrorResponse, IBaseModel } from "../types";

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

const executeRequest = async <TResponse extends IErrorResponse>(
  func: () => Promise<TResponse>
) =>
  ExecuteAsync(async (onFailure: FailureCallback) => {
    {
      let result = {} as TResponse;

      try {
        result = await func();
      } catch (err: any) {
        if (axios.isAxiosError<TResponse>(err) && err.response) {
          const errorResponseData = err.response?.data as TResponse;

          console.log(errorResponseData);

          onFailure(errorResponseData.error.message ?? errorResponseData.error);
        } else {
          throw err;
        }
      }

      return result;
    }
  });

export const requestWithPayload = async <
  TPayload,
  TResponse extends IErrorResponse
>(
  httpMethod: "post" | "put",
  url: string,
  payload: TPayload
) =>
  executeRequest<TResponse>(async () => {
    const { data } = await axios[httpMethod]<
      TPayload,
      AxiosResponse<TResponse>
    >(url, payload);

    return data;
  });

export const requestWithoutPayload = async <TResponse extends IErrorResponse>(
  httpMethod: "get" | "delete",
  url: string,
  config?: AxiosRequestConfig
) =>
  executeRequest<TResponse>(async () => {
    const { data } = await axios[httpMethod]<TResponse>(url, config);

    return data;
  });
