import request, { AxiosResponse } from "axios";

import axios from "axios";
import {
  AOResult,
  ExecuteAsync,
  FailureCallback,
} from "../../helpers/AOResult";
import { ErrorResponse } from "../../types/firebase";
import { FIREBASE_DATABASE_API_URL } from "./constants";

export const postToFirebase = async <TPayload, TResponse extends ErrorResponse>(
  url: string,
  payload: TPayload
) => {
  return ExecuteAsync<TResponse>(async (onFailure: FailureCallback) => {
    let response = {} as TResponse;

    try {
      const { data } = await request.post<TPayload, AxiosResponse<TResponse>>(
        url,
        payload
      );

      response = data;
    } catch (err: any) {
      if (request.isAxiosError<TResponse>(err) && err.response) {
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

export const postModelToFirebase = <T>(
  path: string,
  item: T
): Promise<AOResult<string>> =>
  ExecuteAsync(async (onFailure: FailureCallback): Promise<string> => {
    const response = await axios.post(FIREBASE_DATABASE_API_URL + path, item);

    const id = response.data.name;

    return id;
  });
