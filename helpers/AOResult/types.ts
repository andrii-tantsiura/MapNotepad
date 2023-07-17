import { AOResult } from ".";

export type AwaitedResult<T> = Promise<AOResult<T>>;

export type FailureCallback = (message: string) => void;

export type AsyncFunc<T> = (onFailure: FailureCallback) => Promise<T>;

export type ExtractErrorMessage = (exception: any) => string | undefined;
