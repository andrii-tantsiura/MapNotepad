import axios, { AxiosResponse } from "axios";

import { FIREBASE_DATABASE_API_URL } from "../config";
import { AOResult, ExecuteAsync, FailureCallback } from "../helpers/AOResult";
import { ErrorResponse } from "../types";
import { getAxiosRequestConfig } from "./responseTransformers";

export const postToFirebase = async <TPayload, TResponse extends ErrorResponse>(
  url: string,
  payload: TPayload
) => {
  return ExecuteAsync<TResponse>(async (onFailure: FailureCallback) => {
    let response = {} as TResponse;

    try {
      const { data } = await axios.post<TPayload, AxiosResponse<TResponse>>(
        url,
        payload
      );

      response = data;
    } catch (err: any) {
      if (axios.isAxiosError<TResponse>(err) && err.response) {
        const errorResponseData = err.response?.data as TResponse;

        console.log(errorResponseData);

        onFailure(errorResponseData.error.message);
      } else {
        throw err;
      }
    }

    return response;
  });
};

export const getArrayFromFirebase = <T>(
  path: string,
  reviver?: (key: string, value: any) => any
): Promise<AOResult<T[]>> =>
  ExecuteAsync(async (onFailure: FailureCallback): Promise<T[]> => {
    const response = await axios.get<T[]>(
      FIREBASE_DATABASE_API_URL + path,
      getAxiosRequestConfig<T>(reviver)
    );

    return response.data;
  });
