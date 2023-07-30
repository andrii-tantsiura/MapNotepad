import { FirebaseConfig } from "../../config";
import { AOResult } from "../../helpers/AOResult";
import { AsyncResult } from "../../helpers/AOResult/types";
import { ICredentialsModel } from "../../types/models";
import {
  createFirebaseRequestConfig,
  extractErrorMessageIfFailure,
} from "../../utils";
import ApiService from "../ApiService";

type AuthenticatedRequest = <TResult>(
  authenticatedUrl: string
) => AsyncResult<TResult>;

export class FirebaseRealtimeDBService {
  public credentials: ICredentialsModel | null = null;

  private createAuthenticatedUrl = (
    path: string,
    { idToken, userId }: ICredentialsModel
  ) => `${FirebaseConfig.realtimeDbUrl}/${userId}/${path}?auth=${idToken}`;

  private executeAuthenticatedRequest = async <TResult>(
    url: string,
    request: AuthenticatedRequest
  ): AsyncResult<TResult> => {
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

  public get = async <TResponse>(url: string): AsyncResult<TResponse> =>
    this.executeAuthenticatedRequest<TResponse>(
      url,
      async (authenticatedUrl: string) =>
        ApiService.request(
          "get",
          authenticatedUrl,
          createFirebaseRequestConfig()
        )
    );

  public delete = async <TResponse>(url: string): AsyncResult<TResponse> =>
    this.executeAuthenticatedRequest<TResponse>(
      url,
      async (authenticatedUrl: string) =>
        ApiService.request("delete", authenticatedUrl)
    );

  public put = async <TResponse, TPayload>(
    url: string,
    payload: TPayload
  ): AsyncResult<TResponse> =>
    this.executeAuthenticatedRequest<TResponse>(
      url,
      async (authenticatedUrl: string) =>
        ApiService.request("put", authenticatedUrl, payload)
    );

  public post = async <TResponse, TPayload>(
    url: string,
    payload: TPayload
  ): AsyncResult<TResponse> =>
    this.executeAuthenticatedRequest<TResponse>(
      url,
      async (authenticatedUrl: string) =>
        ApiService.request("post", authenticatedUrl, payload)
    );
}
