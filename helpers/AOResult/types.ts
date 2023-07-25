import { AOResult } from ".";

export type AsyncFunc<T> = (onFailure: FailureCallback) => Promise<T>;

export type FailureCallback = (message: string) => void;

export type AsyncResult<T> = Promise<AOResult<T>>;
