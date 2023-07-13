import request, { AxiosResponse } from "axios";

import { ExecuteAsync, FailureCallback } from "../../helpers/AOResult";
import { ErrorResponse } from "../../types/firebase";

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
