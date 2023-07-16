import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { ExecuteAsync } from "../helpers/AOResult";

export const requestWithPayload = async <TPayload, TResponse>(
  httpMethod: "post" | "put",
  url: string,
  payload: TPayload
) =>
  ExecuteAsync<TResponse>(async () => {
    const { data } = await axios[httpMethod]<
      TPayload,
      AxiosResponse<TResponse>
    >(url, payload);

    return data;
  });

export const requestWithoutPayload = async <TResponse>(
  httpMethod: "get" | "delete",
  url: string,
  config?: AxiosRequestConfig
) =>
  ExecuteAsync<TResponse>(async () => {
    const { data } = await axios[httpMethod]<TResponse>(url, config);

    return data;
  });