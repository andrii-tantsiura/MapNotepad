import { ErrorMessages } from "../../enums";
import { AsyncFunc, AwaitedResult } from "./types";

export class AOResult<T = null> {
  public isSuccess: boolean = false;
  public data?: T;
  public exception?: any;
  public message?: string;

  public setSuccess(data: T) {
    this.isSuccess = true;
    this.data = data;
  }

  public setFailure(message: string) {
    this.isSuccess = false;
    this.message = message;
    this.exception = undefined;
  }

  public setException(exception: any) {
    this.isSuccess = false;
    this.message = undefined;
    this.exception = exception;
  }

  convertTo<TNewType = undefined>(data?: TNewType) {
    let newResult = new AOResult<TNewType>();

    newResult.data = data;
    newResult.isSuccess = this.isSuccess;
    newResult.exception = this.exception;
    newResult.message = this.message;

    return newResult;
  }

  getMessage(): string {
    return (
      this.exception?.message ?? this.message ?? ErrorMessages.SOME_WENT_WRONG
    );
  }
}

export async function ExecuteAsync<T>(func: AsyncFunc<T>): AwaitedResult<T> {
  const result = new AOResult<T>();

  let isOnFailureExecuted: boolean = false;

  const onFailure = (message: string): void => {
    isOnFailureExecuted = true;
    result.setFailure(message);
  };

  try {
    const funcResult = await func(onFailure);

    if (!isOnFailureExecuted) {
      result.setSuccess(funcResult);
    }
  } catch (ex: any) {
    result.setException(ex);
  }

  return result;
}
