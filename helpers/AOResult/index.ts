import { ErrorMessages } from "../../enums";
import { AsyncFunc, AwaitedResult, ExtractErrorMessage } from "./types";

export class AOResult<T> {
  public isSuccess: boolean = false;
  public result?: T;
  public exception?: any;
  public message?: string;

  public setSuccess(result: T) {
    this.isSuccess = true;
    this.result = result;
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

  convertTo<TNewType>(data?: TNewType) {
    let newResult = new AOResult<TNewType>();

    newResult.result = data;
    newResult.isSuccess = this.isSuccess;
    newResult.exception = this.exception;
    newResult.message = this.message;

    return newResult;
  }

  getMessage() {
    return (
      this.exception?.message ?? this.message ?? ErrorMessages.SOME_WENT_WRONG
    );
  }
}

export async function ExecuteAsync<T>(
  func: AsyncFunc<T>,
  extractErrorMessage?: ExtractErrorMessage
): AwaitedResult<T> {
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
    const extractedMessage = extractErrorMessage?.(ex);

    if (extractedMessage) {
      result.setFailure(extractedMessage);
    } else {
      result.setException(ex);
    }
  }

  return result;
}
