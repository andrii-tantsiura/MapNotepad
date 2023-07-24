import { FirebaseConfig } from "../../config";
import { AOResult } from "../../helpers/AOResult";
import { AwaitedResult } from "../../helpers/AOResult/types";
import { ICredentials } from "../../types";
import {
  createFirebaseRequestConfig,
  extractErrorMessageIfFailure,
} from "../../utils";
import ApiService from "../ApiService";

type AuthenticatedRequest = <TResult>(
  authenticatedUrl: string
) => AwaitedResult<TResult>;

export class FirebaseRealtimeDBService {
  public credentials: ICredentials | null = null;

  private createAuthenticatedUrl = (
    path: string,
    { idToken, userId }: ICredentials
  ) => `${FirebaseConfig.realtimeDbUrl}/${userId}/${path}?auth=${idToken}`;

  private executeAuthenticatedRequest = async <TResult>(
    url: string,
    request: AuthenticatedRequest
  ): AwaitedResult<TResult> => {
    let requestResult = new AOResult<TResult>();

    if (this.credentials) {
      const authenticatedUrl = this.createAuthenticatedUrl(
        url,
        this.credentials
      );

      requestResult = await request(authenticatedUrl);

      extractErrorMessageIfFailure(requestResult);
    } else {
      requestResult.setFailure("No credentials");
    }

    return requestResult;
  };

  public get = async <TResponse>(url: string): AwaitedResult<TResponse> =>
    this.executeAuthenticatedRequest<TResponse>(
      url,
      async (authenticatedUrl: string) => {
        return ApiService.request(
          "get",
          authenticatedUrl,
          createFirebaseRequestConfig()
        );
      }
    );

  public delete = async <TResponse>(url: string): AwaitedResult<TResponse> =>
    this.executeAuthenticatedRequest<TResponse>(
      url,
      async (authenticatedUrl: string) => {
        return ApiService.request("delete", authenticatedUrl);
      }
    );

  public put = async <TResponse, TPayload>(
    url: string,
    payload: TPayload
  ): AwaitedResult<TResponse> =>
    this.executeAuthenticatedRequest<TResponse>(
      url,
      async (authenticatedUrl: string) => {
        return ApiService.request("put", authenticatedUrl, payload);
      }
    );

  public post = async <TResponse, TPayload>(
    url: string,
    payload: TPayload
  ): AwaitedResult<TResponse> =>
    this.executeAuthenticatedRequest<TResponse>(
      url,
      async (authenticatedUrl: string) => {
        return ApiService.request("post", authenticatedUrl, payload);
      }
    );
}
