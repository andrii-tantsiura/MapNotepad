import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { ExecuteAsync } from "../../helpers/AOResult";
import { AsyncResult } from "../../helpers/AOResult/types";

export type HttpMethodWithPayload = "post" | "put";
export type HttpMethod = "get" | "delete";

class ApiService {
  request<TResponse, TPayload>(
    httpMethod: HttpMethodWithPayload,
    url: string,
    payload: TPayload
  ): AsyncResult<TResponse>;
  request<TResponse>(
    httpMethod: HttpMethod,
    url: string,
    config?: AxiosRequestConfig
  ): AsyncResult<TResponse>;
  request<TResponse, TPayload>(
    httpMethod: HttpMethod | HttpMethodWithPayload,
    url: string,
    payload?: TPayload,
    config?: AxiosRequestConfig
  ): AsyncResult<TResponse> {
    const request = payload
      ? async () => {
          const { data } = await axios[httpMethod]<
            TPayload,
            AxiosResponse<TResponse>
          >(url, payload);

          return data;
        }
      : async () => {
          const { data } = await axios[httpMethod]<TResponse>(url, config);

          return data;
        };

    return ExecuteAsync<TResponse>(request);
  }
}

export default new ApiService();
