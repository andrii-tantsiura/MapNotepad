import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { ExecuteAndClarifyErrorIfNeed } from "../helpers/AOResult";

export const requestWithPayload = async <TPayload, TResponse>(
  httpMethod: "post" | "put",
  url: string,
  payload: TPayload
) =>
  ExecuteAndClarifyErrorIfNeed<TResponse>(async () => {
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
  ExecuteAndClarifyErrorIfNeed<TResponse>(async () => {
    const { data } = await axios[httpMethod]<TResponse>(url, config);

    return data;
  });
