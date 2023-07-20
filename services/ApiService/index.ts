import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { ExecuteAsync } from "../../helpers/AOResult";
import { AwaitedResult } from "../../helpers/AOResult/types";
import { extractErrorMessage } from "../../utils";

type HttpMethodWithPayload = "post" | "put";
type HttpMethod = "get" | "delete";

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://api.example.com",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  request<TResponse, TPayload>(
    httpMethod: HttpMethodWithPayload,
    url: string,
    payload: TPayload
  ): AwaitedResult<TResponse>;
  request<TResponse>(
    httpMethod: HttpMethod,
    url: string,
    config?: AxiosRequestConfig
  ): AwaitedResult<TResponse>;
  request<TResponse, TPayload>(
    httpMethod: HttpMethod | HttpMethodWithPayload,
    url: string,
    payload?: TPayload,
    config?: AxiosRequestConfig
  ) {
    const func = payload
      ? async () => {
          const { data } = await this.instance[httpMethod]<
            TPayload,
            AxiosResponse<TResponse>
          >(url, payload);

          return data;
        }
      : async () => {
          const { data } = await this.instance[httpMethod]<TResponse>(
            url,
            config
          );

          return data;
        };

    return ExecuteAsync<TResponse>(func, extractErrorMessage);
  }
}

export default new ApiService();
