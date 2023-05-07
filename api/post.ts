import axios, { AxiosResponse } from "axios";
import { AuthErrorResponse } from "../types/auth";

export const FIREBASE_API_KEY = "AIzaSyDNrzSTY0ZRPpfmSzqgMWl95weevrmh-cw";

export const post = async <TPayload, TResponse>(
  url: string,
  payload: TPayload
) => {
  let errorCode: string | unknown;
  let data: TResponse | unknown;

  try {
    const response = await axios.post<TPayload, AxiosResponse<TResponse>>(
      url,
      payload
    );

    data = response.data;
    // @ts-ignore
  } catch (error: AxiosError<AuthErrorResponse>) {
    errorCode = error.response?.data.error.message;
  }

  return { data: data as TResponse, errorCode: errorCode as string };
};
