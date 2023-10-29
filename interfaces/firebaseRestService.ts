import { AsyncResult } from "../helpers/AOResult/types";

export interface IFirebaseRestService {
  getArray: <TResponse>(url: string) => AsyncResult<Array<TResponse>>;
  getObject: <TResponse>(url: string) => AsyncResult<TResponse>;
  delete: (url: string) => AsyncResult<void>;
  post: <TPayload, TResponse>(
    url: string,
    payload: TPayload
  ) => AsyncResult<TResponse>;
  put: <TPayload>(url: string, payload: TPayload) => AsyncResult<void>;
}
