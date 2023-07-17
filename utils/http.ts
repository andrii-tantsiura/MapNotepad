import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { ExecuteAsync } from "../helpers/AOResult";
import { extractErrorMessage } from "./firebase";

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
  }, extractErrorMessage);

export const requestWithoutPayload = async <TResponse>(
  httpMethod: "get" | "delete",
  url: string,
  config?: AxiosRequestConfig
) =>
  ExecuteAsync<TResponse>(async () => {
    const { data } = await axios[httpMethod]<TResponse>(url, config);

    return data;
  }, extractErrorMessage);
