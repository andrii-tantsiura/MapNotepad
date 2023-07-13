import { AxiosRequestConfig, AxiosResponse } from "axios";

import { IBaseModel } from "../types";

interface IModels {
  [index: string]: IBaseModel;
}

export const getAxiosRequestConfig = <T>(
  reviver?: (key: string, value: any) => any
): AxiosRequestConfig => ({
  transformResponse: withFirebaseModelsToArray<T>(reviver),
});

function withFirebaseModelsToArray<T>(
  reviver?: (key: string, value: any) => any
) {
  return function (response: AxiosResponse): Array<T> {
    const models = JSON.parse(String(response), reviver) as IModels;
    const array: Array<T> = [];

    for (const key in models) {
      models[key].id = key;

      array.push(models[key] as T);
    }

    return array;
  };
}

export const productReviver = (key: string, value: any) =>
  key === "latitude" || key === "longitude" ? Number(value) : value;
