import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { ExecuteAsync, FailureCallback } from "../helpers/AOResult";
import { IErrorResponse } from "../types";

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
